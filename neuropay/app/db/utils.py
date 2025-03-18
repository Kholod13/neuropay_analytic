def normalize_query_parameters(parameters_dict):
    fields = []
    parameters = []

    for key, value in parameters_dict.items():
        fields.append(f'{key} = ?')
        parameters.append(value)

    return fields, parameters
