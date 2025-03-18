def validate_entity_id(entity_id, entities):
    return entity_id in set(entity['id'] for entity in entities)
