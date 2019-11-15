export default api => ({dispatch, getState}) => next => action => {
    if (typeof action === "function") return action(dispatch, getState);

    const {request, type, ...rest} = action;

    if (!request) {
        return next(action);
    }
    next({...rest, type: `${type}_PENDING`});

    let actionPromise = api[request.method](request.path, {
            data: request.data,
            headers: request.headers,
            params: request.params,
        }
    );

    actionPromise.then(response => {
        return next({...rest, response, type: `${type}_SUCCESS`});
    }, error => {
        next({...rest, error, type: `${type}_FAIL`});
    });
    return actionPromise;
}