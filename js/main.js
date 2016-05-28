var PoEdit = new function()
{
	this.init = function() {
		PoEdit.editor = CodeMirror.fromTextArea(
			document.getElementById('code-window'),
			{ mode:'poe', theme:'bschug' }
		);
	}
};
