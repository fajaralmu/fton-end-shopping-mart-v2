import * as common from './Common'
import * as types from '../redux/types'
const axios = require('axios');
const POST_METHOD = "post";


export const getEntitiesWithCallbackMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.GET_ENTITY_WITH_CALLBACK) { return next(action); }

    axios.post(action.meta.url, (action.payload), {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const data = response.data;
            if (data.entities == null || data.entities.length == 0) {
                alert("Data not found!");
                return;
            }

            action.meta.callback(data, action.meta.referer);

            let newAction = Object.assign({}, action, {
                payload: data
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(console.err).finally(param => action.meta.app.endLoading());
}

export const updateEntityMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.UPDATE_ENTITY) { return next(action); }

    axios.post(action.meta.url, (action.payload), {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const data = response.data;
            if (data.code != "00") {
                alert("Error Update Entity!");
                return;
            }
            alert("Update Success!");
            const callback = action.meta.callback;
            const referer = action.meta.referer;
            let newAction = Object.assign({}, action, { payload: data });
            delete newAction.meta;
            store.dispatch(newAction);
            callback(referer);
        })
        .catch(console.err)
        .finally(param => action.meta.app.endLoading());
}

export const getEntityByIdMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.GET_ENTITY_BY_ID) { return next(action); }

    axios.post(action.meta.url, (action.payload), {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const data = response.data;
            if (data.entities == null || data.entities.length == 0) {
                alert("Data not found!");
                return;
            }
            let newAction = Object.assign({}, action, {
                payload: data
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(console.err)
        .finally(param => action.meta.app.endLoading());
}

export const getEntityListMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.GET_ENTITY) { return next(action); }

    axios.post(action.meta.url, (action.payload), {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const data = response.data;
            if (data.entities == null) {
                data.entities = [];
            }
            data.entityConfig = action.meta.entityConfig;
            let newAction = Object.assign({}, action, {
                payload: data
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(console.err)
        .finally(param => action.meta.app.endLoading());
}

export const getEntityPropertyMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.GET_ENTITY_PROPERTY) { return next(action); }

    axios.post(action.meta.url, (action.payload), {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const data = response.data;
            if (data == null) {
                alert("Error requesting EntityProperty");
                return;
            }
            let newAction = Object.assign({}, action, {
                payload: data
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(console.err)
        .finally(param => action.meta.app.endLoading());
}

export const getManagementMenusMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.GET_MANAGEMENT_MENUS) { return next(action); }

    axios.post(action.meta.url, (action.payload), {
        headers: common.commonAuthorizedHeader()
    })
        .then(response => {
            const data = response.data;
            if (data == null) {
                alert("Error requesting getManagementMenus");
                return;
            }
            let newAction = Object.assign({}, action, {
                payload: data
            });
            delete newAction.meta;
            store.dispatch(newAction);
        })
        .catch(console.err)
        .finally(param => action.meta.app.endLoading());
}

export const removeManagedEntityMiddleware = store => next => action => {
    if (!action.meta || action.meta.type !== types.REMOVE_MANAGED_ENTITY) { return next(action); }
    let newAction = Object.assign({}, action, { payload: action.payload });
    delete newAction.meta;
    store.dispatch(newAction);
}

