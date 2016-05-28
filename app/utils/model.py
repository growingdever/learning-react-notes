def model_to_dict(model):
    if model is None:
        return None

    d = {}
    for column in model.__table__.columns:
        d[column.name] = str(getattr(model, column.name))

    return d
