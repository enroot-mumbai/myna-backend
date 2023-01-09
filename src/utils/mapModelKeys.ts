// Function to take data and a model, use the attributes of the model to identify the relevant fields in the data object and only return them

export function mapDataToModel(data: { [key: string]: any }, model: any, allowExtraData: Boolean = true) {
    const modelKeys = Object.keys(model.rawAttributes);
    let mappedData: { [key: string]: any } = {};
    let extraData: { [key: string]: any } = {};

    for (const key of Object.keys(data)) {
        if (modelKeys.includes(key)) {
            mappedData[key] = data[key];
        } else {
            extraData[key] = data[key];
        }
    }

    if (allowExtraData) {
        extraData = {}
    }

    return { mappedData, extraData };
}