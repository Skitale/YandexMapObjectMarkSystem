INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `address`, `userId`)
VALUES ('1', 'Moscow', '55.755679065', '37.63036819877796', 'Московский район', '6');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `userId`)
VALUES ('2', 'Nizhny Novgorod', '56.319220', '44.014960', '6');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `userId`)
VALUES ('3', 'St. Petersburg', '59.975368', '30.332815', '6');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `userId`)
VALUES ('4', 'Perm', '58.015933', '56.231737', '6');
INSERT INTO `yandexmapobj`.`objectmark` (`id`, `name`, `latitude`, `longitude`, `userId`)
VALUES ('5', 'Berlin', '52.554347', '13.288617', '6');

UPDATE hibernate_sequence SET next_val = 6;