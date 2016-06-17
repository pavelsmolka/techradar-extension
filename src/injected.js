let dfp = null;

const dfpInterval = setInterval(() => {

    dfp = window.dfp && window.dfp.getAdverts().map(({creativeId, isEmpty, lineItemId, size}) => {
        return {
            creativeId, isEmpty, lineItemId, size
        };
    });

    if (dfp && dfp.length === 0) {
        dfp = null;
    }

    if (dfp) {
        window.postMessage({
            type: "DFP", data: {
                dfp: dfp
            }
        }, "*");

        clearInterval(dfpInterval);
    }

}, 2000);

window.postMessage({
    type: "FEP", data: {
        fep: window.FEP,
    }
}, "*");