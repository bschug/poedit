function getRGB() {
	var colorHex, colorRGB;
	var xR = xG = xB = 0x0;
	var R = G = B = 0;
	colorHex = document.getElementById("color-picker").value;
	xR = "0x" + colorHex.substring(1,3);
	xG = "0x" + colorHex.substring(3,5);
	xB = "0x" + colorHex.substring(5,7);
	R = parseInt(xR);
	G = parseInt(xG);
	B = parseInt(xB);
	colorRGB = R + " " + G + " " + B;

	document.getElementById("RGB-color").innerHTML = colorRGB;
}