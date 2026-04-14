function Calcular() {

    let altura = parseFloat(document.getElementById("altura").value);
    let peso = parseFloat(document.getElementById("peso").value);

    let IMC = peso / (altura * altura);
  
    document.getElementById("resp").innerHTML = IMC;
}