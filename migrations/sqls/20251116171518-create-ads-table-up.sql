CREATE TABLE ads (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  image         LONGBLOB NOT NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  link          VARCHAR(255),
  template      ENUM('banner', 'fullscreen', 'card', 'video', 'custom')
                NOT NULL
                DEFAULT 'banner',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_template (template),
  INDEX idx_title    (title(191))
);