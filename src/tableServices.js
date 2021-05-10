import {api} from "./api";

export const TableServices = {
    tableLists,
    getOne,
    updateItem,
    deleteOne,
}

function tableLists() {
    return api.get("employees");
}

function getOne(id) {
    return api.get("employee/" + id)
}

function updateItem(data) {
    return api.put("update/" + data.id, data)
}

function deleteOne(id) {
    return api.deleteApi("delete/" + id)
}