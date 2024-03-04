function convertYaml() {
    const yamlInput = document.getElementById("yamlInput").value;

    try {
        const data = jsyaml.safeLoad(yamlInput);
        const resultDict = {};
        traverseYaml(data, "", resultDict);

        let outputText = "";
        for (const [path, value] of Object.entries(resultDict)) {
            if (String(value).startsWith("![") && String(value).endsWith("]")) {
                outputText += `\${secure::${path}}\n`;
            } else {
                outputText += `\${${path}}\n`;
            }
        }

        document.getElementById("convertedOutput").value = outputText;
    } catch (error) {
        console.error(error);
        alert("Error converting YAML. Please check your input.");
    }
}

function traverseYaml(data, path = "", result = null) {
    if (result === null) {
        result = {};
    }

    if (typeof data === "object") {
        for (const [key, value] of Object.entries(data)) {
            traverseYaml(value, path ? `${path}.${key}` : key, result);
        }
    } else {
        result[path] = data;
    }
}
