exports.createId = function () {
    return Math.random().toString(36).replace("0.","")
}

function makeServiceCall(hydra, to, body, isFullResponse)
{   
    body.meta = {}
    body.meta.serviceId = hydra.getInstanceID(),
    body.meta.serviceName = hydra.getServiceName();
    body.meta.authToken = hydra.token;
    let message = hydra.createUMFMessage({
        to: to,
        from: hydra.getServiceName() + ':/',
        body: body || {}
    });
    return hydra.makeAPIRequest(message).then((response) => {
        if(response.result.error)
        {
            console.error("## INTERCOM ## Failed to get desired result from service", response.result)
        }
        else
        {
            console.log('## INTERCOM ## response', response.result);
        }
        
        if(isFullResponse)
        {
            return response;
        }
        else
        {
            return response.result
        }
    });
}

module.exports.makeServiceCall = makeServiceCall;