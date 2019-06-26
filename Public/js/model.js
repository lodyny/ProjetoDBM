var properties = [];
var references = [];

function Property(_name, _description, _type, _isMandatory, _isUnique, _pattern, _minimum, _maximum, _label) {
  this.name = _name;
  this.description = _description;
  this.type = _type;
  this.isMandatory = _isMandatory;
  this.isUnique = _isUnique;
  this.pattern = _pattern;
  this.minimum = _minimum;
  this.maximum = _maximum;
  this.label = _label;
}

var showPropertyError = function(error_message) {
  var span = document.getElementById("property-error");
  span.textContent = error_message;
};

var addProperty = function() {
  document.getElementById("property-error").textContent = "";
  var propertyName = document.getElementById("property_name").value;

  if (propertyName.trim() == "") {
    showPropertyError("Property name can't be empty.");
    return;
  }

  var exists = properties.some(property => {
    return property.name == propertyName;
  });

  if (exists) {
    showPropertyError("Property already exists.");
    return;
  }

  var propertyDescription = document.getElementById("property_description").value;
  var propertyType = document.getElementById("property_type").value;
  var propertyMandatory = document.getElementById("property_mandatory").checked;
  var propertyUnique = document.getElementById("property_unique").checked;
  var propertyLabel = document.getElementById("property_label").value.trim() != "" ? document.getElementById("property_label").value : document.getElementById("property_name").value;

  var pattern, minimum, maximum = null;

  switch(propertyType)
  {
    case "string":
      pattern = document.getElementById("property_pattern").value.trim().length > 0 ? document.getElementById("property_pattern").value : null;
      break;
    case "number":
      pattern = document.getElementById("property_pattern").value.trim().length > 0 ? document.getElementById("property_pattern").value : null;
      minimum = document.getElementById("property_minimum").value.trim().length > 0 ? document.getElementById("property_minimum").value : null;
      maximum = document.getElementById("property_maximum").value.trim().length > 0 ? document.getElementById("property_maximum").value : null;
      break;
    case "real":
      pattern = document.getElementById("property_pattern").value.trim().length > 0 ? document.getElementById("property_pattern").value : null;
      minimum = document.getElementById("property_minimum").value.trim().length > 0 ? document.getElementById("property_minimum").value : null;
      maximum = document.getElementById("property_maximum").value.trim().length > 0 ? document.getElementById("property_maximum").value : null;
      break;
    case "char":
      pattern = document.getElementById("property_pattern").value.trim().length > 0 ? document.getElementById("property_pattern").value : null;
      break;
  }

  properties.push(
    new Property(
      propertyName,
      propertyDescription,
      propertyType,
      propertyMandatory,
      propertyUnique,
      pattern,
      minimum,
      maximum,
      propertyLabel
    )
  );

  cleanPropertyFields();
  renderPropertyTable();
};

var cleanPropertyFields = function() {
  document.getElementById("property_name").value = "";
  document.getElementById("property_description").value = "";
  document.getElementById("property_type").selectedIndex = 0;
  document.getElementById("property_mandatory").checked = false;
  document.getElementById("property_unique").checked = false;
  document.getElementById("property_pattern").value = "";
  document.getElementById("property_minimum").value = "";
  document.getElementById("property_maximum").value = "";
  document.getElementById("property_label").value = "";

  refreshExtraProperties();
};

var renderPropertyTable = function() {
  var table = document.getElementById("properties_table");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  var header = document.createElement("thead");
  var header_row = document.createElement("tr");

  var thName = document.createElement("th");
  thName.textContent = "Name";
  header_row.appendChild(thName);

  var thType = document.createElement("th");
  thType.textContent = "Type";
  header_row.appendChild(thType);

  var thMandatory = document.createElement("th");
  thMandatory.textContent = "Required";
  header_row.appendChild(thMandatory);

  header.appendChild(header_row);
  table.appendChild(header);

  var body = document.createElement("tbody");
  properties.forEach(property => {
    var tr = document.createElement("tr");

    var propName = document.createElement("td");
    propName.textContent = property.name;
    tr.appendChild(propName);

    var propType = document.createElement("td");
    propType.textContent = property.type;
    tr.appendChild(propType);

    var propMandatory = document.createElement("td");
    if (propMandatory !== undefined) {
      property.isMandatory
        ? (propMandatory.textContent = "Yes")
        : (propMandatory.textContent = "No");
    }
    tr.appendChild(propMandatory);

    var propRemove = document.createElement("td");
    var propRemoveLink = document.createElement("a");
    propRemoveLink.setAttribute(
      "href",
      "javascript:deleteProp('" + property.name + "');"
    );
    propRemoveLink.textContent = "Remove";
    propRemove.appendChild(propRemoveLink);
    tr.appendChild(propRemove);

    body.appendChild(tr);
  });
  table.appendChild(body);
};

var deleteProp = function(name) {
  for (var i = 0; i < properties.length; i++) {
    if (properties[i].name === name) properties.splice(i, 1);
  }

  renderPropertyTable();
};

function Reference(_model, _relation, _label, _isRequired) {
  this.model = _model;
  this.relation = _relation;
  this.label = _label;
  this.required = _isRequired;
}

var addReference = function() {
  var referenceModel = document.getElementById("reference_model").value;
  var referenceRelation = document.getElementById("reference_relation").value;
  var referenceLabel = document.getElementById("reference_label").value;
  var referenceRequired = document.getElementById("is_reference_required").checked;

  var exists = references.some(reference => {
    return reference.model == referenceModel;
  });

  if (exists) {
    alert("Reference already exists");
    return;
  }

  references.push(new Reference(referenceModel, referenceRelation, referenceLabel, referenceRequired));

  renderReferencesTable();
  renderModelsList();
  cleanReferenceFields();
};

var cleanReferenceFields = function() {
  document.getElementById("reference_model").selectedIndex = 0;
  document.getElementById("reference_relation").selectedIndex = 0;
};

var renderModelsList = async () => {
  var select = document.getElementById("reference_model");
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }

  var models = null;

  await $.ajax({
    type: "GET",
    url: "/models",
    data: null,
    dataType: "json",
    success: function(data) {
      models = data;
    }
  });

  var count = 0;

  models.forEach(model => {
    var exists = false;

    references.forEach(reference => {
      if (reference.model == model.title) exists = true;
    });

    if (!exists) {
      count += 1;
      var option = document.createElement("option");
      option.setAttribute("value", model.title);
      option.textContent = model.title;
      select.appendChild(option);
    }
  });

  if (count == 0)
    document.getElementById("reference-form").style.display = "none";

    refreshReferenceHelper();
    refreshReferenceLabel();
};

var renderReferencesTable = function() {
  var table = document.getElementById("references_table");

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  var header = document.createElement("thead");
  var header_row = document.createElement("tr");

  var thModel = document.createElement("th");
  thModel.textContent = "Model";
  header_row.appendChild(thModel);

  var thRelation = document.createElement("th");
  thRelation.textContent = "Relation";
  header_row.appendChild(thRelation);

  header.appendChild(header_row);
  table.appendChild(header);

  var body = document.createElement("tbody");
  references.forEach(reference => {
    var tr = document.createElement("tr");

    var refModel = document.createElement("td");
    refModel.textContent = reference.model;
    tr.appendChild(refModel);

    var refRelation = document.createElement("td");
    refRelation.textContent = reference.relation;
    tr.appendChild(refRelation);

    var refRemove = document.createElement("td");
    var refRemoveLink = document.createElement("a");
    refRemoveLink.setAttribute(
      "href",
      "javascript:deleteReference('" + reference.model + "');"
    );
    refRemoveLink.textContent = "Remove";
    refRemove.appendChild(refRemoveLink);
    tr.appendChild(refRemove);

    body.appendChild(tr);
  });
  table.appendChild(body);
};

var deleteReference = function(model) {
  for (var i = 0; i < references.length; i++) {
    if (references[i].model === model) references.splice(i, 1);
  }

  renderReferencesTable();
  renderModelsList();
};

var refreshExtraProperties = function() {
  var type = document.getElementById("property_type");
  switch(type.value)
  {
    case "string":
      toggleField("property_pattern", true);
      toggleField("property_minimum", false);
      toggleField("property_maximum", false);
      break;
    case "number":
      toggleField("property_pattern", true);
      toggleField("property_minimum", true);
      toggleField("property_maximum", true);
      break;
    case "real":
      toggleField("property_pattern", true);
      toggleField("property_minimum", true);
      toggleField("property_maximum", true);
      break;
    case "char":
      toggleField("property_pattern", true);
      toggleField("property_minimum", false);
      toggleField("property_maximum", false);
      break;
    case "array":
      toggleField("property_pattern", false);
      toggleField("property_minimum", false);
      toggleField("property_maximum", false);
      break;
  }
}

var toggleField = function(field, bool)
{
  var field = document.getElementById(field);
  field.disabled = !bool;
}

var submitModel = function() {
  var modelTitle = document.getElementById("model_title").value;
  var modelDescription = document.getElementById("model_description").value;

  var model = {
    title: modelTitle,
    description: modelDescription,
    type: "object",
    properties: {},
    required: [],
    references: references
  };

  properties.forEach(property => {
    var prop = {
      description: property.description,
      type: property.type,
      unique: property.isUnique ? true : false,
      label: property.label
    };

    if(property.pattern != null)
      prop.pattern = property.pattern;
    
    if(property.minimum != null)
      prop.minimum = property.minimum;  
    
    if(property.maximum != null)
      prop.maximum = property.maximum;

    model.properties[property.name] = prop;

    if (property.isMandatory) model.required.push(property.name);
  });

  $.ajax({
    type: "POST",
    url: "/generateModel",
    data: JSON.stringify(model),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response) {  
    }
  });

  
  location.href = "/models.html";
};

var removeModel = function() {
  var model = {
    modelName: this.id.toLowerCase()
  };

  $.ajax({
    type: "DELETE",
    url: "/removeModel",
    data: model,
    success: function(response) {
      removeModelCard(model.modelName);
    }
  });
};

var refreshReferenceHelper = function()
{
  var helper = document.getElementById("reference-helper");
  var relation = document.getElementById("reference_relation");
  var model = document.getElementById("reference_model");

  switch(relation.value)
  {
    case "1-1":
      helper.innerHTML = "This model has a(n) <b>" + model.value + "</b> associated";
      break;
    case "0-M":
      helper.innerHTML = "A <b>" + model.value + "</b> may be associated with this model (not mandatory).";
      break;
    case "1-M":
      helper.innerHTML = "A <b>" + model.value + "</b> is associated with this model.";
      break;
    case "M-M":
      helper.innerHTML = "Many objects of this model are associated with many <b>" + model.value + "s</b>.";
      break;
  }
}

var fetchModelsListGroup = function()
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      renderModelsListGroup(JSON.parse(this.response));
    }
  };
  xhr.open("GET", "/models", true);
  xhr.send(); 
}

function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

var renderModelsListGroup = function(models)
{
  var ul = document.getElementById("models-list");
  
  clearNode(ul);

  models.forEach(model => {
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.textContent = model.title;

    ul.appendChild(li);
  });
}

var refreshReferenceLabel = function()
{
  var modelName = document.getElementById("reference_model").value;

  var model;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      populateReferenceLabel(JSON.parse(this.response).properties);
    }
  };
  xhr.open("GET", "/model/" + modelName, true);
  xhr.send(); 
}

function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

var populateReferenceLabel = function(properties)
{
  var select = document.getElementById("reference_label");
  clearNode(select);

  Object.keys(properties).sort().forEach(prop => {
    var option = document.createElement("option");
    option.setAttribute("value", prop);
    option.textContent = prop;
    select.appendChild(option);
  });
}