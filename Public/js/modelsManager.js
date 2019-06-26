function generate() {
    var config = {
      website_name: document.getElementById("website_name").value,
      motto:document.getElementById("website_motto").value,
      structure: document.getElementById("structure_select").value,
      style:document.getElementById("style_select").value
    }
  
    var waitDiv = $("#waitDialog");
    $.ajax({
      type: "POST",
      url: "/generate",
      data:JSON.stringify(config),
      contentType: "application/json; charset=utf-8",
      beforeSend: function() {
        $(".modal").modal("show");
      },
      success: function(result, status, xhr) {
        $(".modal").modal("hide");
        setTimeout(function() {
          window.open("http://localhost:8080/", "_blank");
        }, 4500);
      }
    });
  }
  
  function renderNewProperty() {
    var root = document.getElementById("properties");
  
    var divProperty = document.createElement("div");
    divProperty.setAttribute("class", "property");
  
    var labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.textContent = "Name";
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("placeholder", "Name");
  
    var labelType = document.createElement("label");
    labelType.setAttribute("for", "type");
    labelType.textContent = "Property Type";
    var cbType = document.createElement("select");
  
    var optObject = document.createElement("option");
    optObject.setAttribute("value", "Object");
    cbType.add(optObject);
    var optArray = document.createElement("option");
    optArray.setAttribute("value", "Array");
    cbType.add(optArray);
    var optString = document.createElement("option");
    optString.setAttribute("value", "String");
    cbType.add(optString);
    var optNumber = document.createElement("option");
    optNumber.setAttribute("value", "Number");
    cbType.add(optNumber);
    var optReal = document.createElement("option");
    optReal.setAttribute("value", "Real");
    cbType.add(optReal);
    var optChar = document.createElement("option");
    optChar.setAttribute("value", "Character");
    cbType.add(optChar);
  
    var labelMandatory = document.createElement("label");
    labelMandatory.setAttribute("for", "chkMandatory");
    labelMandatory.textContent = "Mandatory Field";
    var chkMandatory = document.createElement("input");
    chkMandatory.setAttribute("type", "checkbox");
    chkMandatory.setAttribute("name", "chkMandatory");
    chkMandatory.setAttribute("value", "Mandatory");
  
    divProperty.appendChild(labelName);
    divProperty.appendChild(nameInput);
    divProperty.appendChild(labelType);
    divProperty.appendChild(cbType);
    divProperty.appendChild(labelMandatory);
    divProperty.appendChild(chkMandatory);
  
    root.appendChild(divProperty);
  }
  
  function fetchModels() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        renderModels(JSON.parse(this.response));
      }
    };
    xhr.open("GET", "/models", true);
    xhr.send();
  }
  
  function renderModels(models) {
    var models_div = document.getElementById("models");
    clearNode(models_div);
  
    models.forEach(model => {
      var properties = model.properties;
  
      if (properties !== undefined) {
        var card = document.createElement("div");
        card.className = "card";
        card.id = "card-" + model.title;
        var card_header = document.createElement("div");
        card_header.className = "card-header";
  
        card_header.textContent = model.title;
  
        var close_span = document.createElement("span");
        close_span.className = "pull-right close-icon";
  
        var close_i = document.createElement("i");
        close_i.className = "fa fa-times";
  
        close_i.title = "Remove Model " + model.title;
        close_i.id = model.title;
        close_i.onclick = removeModel;
  
        close_span.appendChild(close_i);
        card_header.appendChild(close_span);
  
        card.appendChild(card_header);
  
        var card_body = document.createElement("div");
        card_body.className = "card-body";
  
        var h5 = document.createElement("h5");
        h5.className = "card-title";
  
        h5.textContent = model.description;
  
        //console.log(model);
  
        card_body.appendChild(h5);
  
        var required = model.required || [];
        Object.keys(properties).forEach(key => {
          var p = document.createElement("p");
          p.className = "card-text";
          p.innerHTML += "&bull; " + key + " (" + properties[key].type + ")";
  
          if (required.includes(key)) {
            p.innerHTML += " <b>required</b>";
          }
          card_body.appendChild(p);
          Object.keys(properties[key]).forEach(sub_key => {
            if (sub_key !== "description" && sub_key !== "type") {
              var sub_p = document.createElement("p");
              sub_p.innerHTML =
                sub_key + ": <b>" + properties[key][sub_key] + "</b>";
              sub_p.className = "sub-property";
  
              card_body.appendChild(sub_p);
            }
          });
        });
  
        var references = document.createElement("h5");
        references.textContent = "References";
        card_body.appendChild(references);
        //console.log(model);
  
        var referencep = document.createElement("p");
        if (model.references.length == 0) {
          referencep.textContent = "None";
          card_body.appendChild(referencep);
        } else {
          model.references.forEach(function(reference) {
            var referencep = document.createElement("p");
            referencep.innerHTML =
              "<b>" + reference.model + "</b>(" + reference.relation + ")";
            card_body.appendChild(referencep);
          });
        }
  
        card.appendChild(card_body);
        models_div.appendChild(card);
      }
    });
  
    document.getElementById("models-count").textContent =
      "Number of existent models: " + models.length;
  }
  
  function removeModelCard(id) {
    location.href = "/models.html";
  }
  
  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
  
  function fetchStyles() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        renderStyles(JSON.parse(this.response));
      }
    };
    xhr.open("GET", "/styles", true);
    xhr.send();
  }
  
  function renderStyles(styles) {
    var select = document.getElementById("style_select");
  
    clearNode(select);
  
    styles.forEach(style => {
      var option = document.createElement("option");
  
      option.setAttribute("value", style.path);
      option.textContent = style.name;
  
      select.appendChild(option);
    });
  }
  
  function fetchStructures() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        renderStructure(JSON.parse(this.response));
      }
    };
    xhr.open("GET", "/structures", true);
    xhr.send();
  }
  
  function renderStructure(structures) {
    var select = document.getElementById("structure_select");
  
    clearNode(select);
  
    structures.forEach(structure => {
      var option = document.createElement("option");
  
      option.setAttribute("value", structure.path);
      option.textContent = structure.name;
  
      select.appendChild(option);
    });
  }
  