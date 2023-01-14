const mapDBToModel = ({
  id,
  title,
  body,
  tags,
  created_at, // eslint-disable-line
  updated_at, // eslint-disable-line
  username
}) => ({
  id,
  title,
  body,
  tags,
  createdAt: created_at, // eslint-disable-line
  updatedAt: updated_at, // eslint-disable-line
  username
})

module.exports = { mapDBToModel }
