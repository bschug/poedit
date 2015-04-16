function Pastebin() {
    this.status = 'Not Initialized';
    this.text = null;

    this.load = function (pastebinId, successCb, errorCb) {
        this.status = 'Loading';
        var pastebinUrl = 'pastebin.com/raw.php?i=' + pastebinId;
        var wrapperUrl = 'http://bschug.net/jsonp.php';

        console.log( 'loading pastebin ' + pastebinId );

        $.ajax({
            url: wrapperUrl,
            data: { 'url': pastebinUrl },
            dataType: 'jsonp',
            success: function (data) {
                if (data.data) {
                    successCb( data.data );
                }
                else {
                    errorCb();
                }
            },
            error: function () { errorCb(); },
        });

    }
}
