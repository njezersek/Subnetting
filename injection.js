function calc(ip, maska){
  if(maska.charAt(0) == "/")maska = narediMasko(maska);

  let ipInt = ipToInt(ip);
  let maskaInt = ipToInt(maska);

  //izracunaj omrezje = ip AND maska
  let omrezjeInt = ipInt & maskaInt;
  //izracunaj brodcast = ip OR NEG maska
  let brodcastInt = ipInt | ~maskaInt;

  let razred = "";
  let maskaRazreda = "0.0.0.0";
  if(ipToBinary(ip).slice(0,1) == "0"){razred = "A"; maskaRazreda = "255.0.0.0"}
  if(ipToBinary(ip).slice(0,2) == "10"){razred = "B"; maskaRazreda = "255.255.0.0"}
  if(ipToBinary(ip).slice(0,3) == "110"){razred = "C"; maskaRazreda = "255.255.255.0"}
  if(ipToBinary(ip).slice(0,4) == "1110")razred = "D";
  if(ipToBinary(ip).slice(0,5) == "11110")razred = "E";

  let stOmrezij = 2**countOnes(ipToBinary(intToIp(ipToInt(maskaRazreda) ^ ipToInt(maska))));

  let output = [
     {vrednost: "IP naslov:", decimalna: ip, binarna: ipToBinary(ip)},
     {vrednost: "Maska:", decimalna: ip, binarna: ipToBinary(ip)},
     {vrednost: "Maska razreda:", decimalna: ip, binarna: ipToBinary(ip)},
     {vrednost: "---", decimalna: "---", binarna: "---"},
     {vrednost: "Omrežje:", decimalna: intToIp(omrezjeInt), binarna: ipToBinary(intToIp(omrezjeInt))},
     {vrednost: "Privi gostitelj:", decimalna: intToIp(omrezjeInt+1), binarna: ipToBinary(intToIp(omrezjeInt+1))},
     {vrednost: "Zadnji gostitelj:", decimalna: intToIp(brodcastInt-1), binarna: ipToBinary(intToIp(brodcastInt-1))},
     {vrednost: "Brodcast:", decimalna: intToIp(brodcastInt), binarna: ipToBinary(intToIp(brodcastInt))},
     {vrednost: "---", decimalna: "---", binarna: "---"},
     {vrednost: "Število gostiteljev:", decimalna: (brodcastInt-omrezjeInt-1)+""},
     {vrednost: "Število podomrežij:", decimalna: stOmrezij+""}
  ]

  console.table(output);
}

function ipToBinary(ip){
  ip = ip.split(".").map(a => ("00000000"+Number(a).toString(2)).slice(-8)).join(".");
  return ip;
}

function ipToInt(ip) {
  var parts = ip.split(".");
  var res = 0;

  res += parseInt(parts[0], 10) << 24;
  res += parseInt(parts[1], 10) << 16;
  res += parseInt(parts[2], 10) << 8;
  res += parseInt(parts[3], 10);

  return res;
}

function intToIp(int) {
  var part1 = int & 255;
  var part2 = ((int >> 8) & 255);
  var part3 = ((int >> 16) & 255);
  var part4 = ((int >> 24) & 255);

  return part4 + "." + part3 + "." + part2 + "." + part1;
}

function countOnes(string){
  return (string.split('1').length-1);
}

function narediMasko(n){
  n = n.slice(1);
  n = Number(n);
  let maska = ("1".repeat(n) + "0".repeat(32-n));
  return intToIp(parseInt(maska, 2));
}
