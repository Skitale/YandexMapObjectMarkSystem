INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `address`)
VALUES ('1', 'Москва', '55.755679065', '37.63036819877796', 'Московский район');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`)
VALUES ('2', 'Нижний Новгород', '56.319220', '44.014960');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`)
VALUES ('3', 'Санкт-Петербург', '59.975368', '30.332815');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`)
VALUES ('4', 'Пермь', '58.015933', '56.231737');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `userId`)
VALUES ('5', 'Берлин', '52.554347', '13.288617', '6');

UPDATE hibernate_sequence SET next_val = 6;