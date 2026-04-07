
function Calcular() {
    
    let horas = Number(document.getElementById("inputHoras").value);
    let veiculoGrande = document.getElementById("inputVeiculo").checked;
    let clienteFrequente = document.getElementById("inputFrequencia").checked;

    let valor = 0;
    if (horas <= 0 || isNaN(horas)) {
        document.getElementById("resp").innerText = "Digite um valor válido de horas.";
        return;
    }

    if (horas >= 24) {
        let diarias = Math.floor(horas / 24);
        let horasRestantes = horas % 24;

        valor = diarias * 60;

        if (horasRestantes > 0) {
            valor += 5; // primeira hora
            if (horasRestantes > 1) {
                valor += (horasRestantes - 1) * 2.5;
            }
        }
    } else {
        valor = 5; // primeira hora
        if (horas > 1) {
            valor += (horas - 1) * 2.5;
        }
    }

    if (veiculoGrande) {
        valor *= 1.25;
    }

    // Desconto cliente frequente
    if (clienteFrequente) {
        valor *= 0.95;
    }

    document.getElementById("resp").innerText = 
        "O valor total é R$ " + valor.toFixed(2);
}
