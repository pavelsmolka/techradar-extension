const fepAndDfpInterval = setInterval(() => {

    var dfp = window.dfp && window.dfp.getAdverts().map(({creativeId, isEmpty, lineItemId, size}) => {
        return {
            creativeId, isEmpty, lineItemId, size
        };
    });

    if (dfp && dfp.length === 0) {
        dfp = null;
    }

    window.postMessage({
        type: "FEP", data: {
            fep: window.FEP,
            dfp: dfp
        }
    }, "*");

    if (dfp) {
        clearInterval(fepAndDfpInterval);
    }

}, 2000);