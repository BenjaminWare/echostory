CREATE TABLE if not exists document (
  id VARCHAR(36) primary key not null,
  title VARCHAR(255),
  text TEXT,
  created_at VARCHAR(24),
  user_id varchar(36),
  vector F32_BLOB(256)
)