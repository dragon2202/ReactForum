INSERT INTO roles(title)
VALUES
('Owner'),
('Admin'),
('User');

INSERT INTO permissions(action)
VALUES
('post'),
('manage-users');

INSERT INTO roles_permissions (role_id, permission_id)
VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1);

INSERT INTO users (email, password, username)
VALUES
('a@gmail.com', 12356, 'Dummy Admin');

INSERT INTO community (title, public, summary)
VALUES
("Halo", 0, "Halo is an American military science fiction first-person shooter managed and developed by 343 Industries and published by Xbox Game Studios. The franchise and its early main installments were originally developed by Bungie. The central focus of the franchise builds off the experiences of Master Chief John-117, one of a group of supersoldiers codenamed Spartans, and his artificial intelligence (AI) companion, Cortana. The original trilogy centers on an interstellar war between humanity and an alliance of aliens known as the Covenant. The Covenant, led by their religious leaders called the Prophets, worship an ancient civilization known as the Forerunners, who perished while defeating the parasitic Flood. The eponymous Halo Array are a group of immense, habitable, ring-shaped superweapons that were created by the Forerunners to destroy the Flood, but which the Covenant mistake for religious artifacts that, if activated, would transport them on a Great Journey to meet the Forerunners."),
("For Honor", 0, "For Honor is an action fighting game set during a medieval, fantasy setting. Players can play as a character from one of four different factions, namely the Iron Legion (Knights), the Warborn (Vikings), the Dawn Empire (Samurai), and the Wu Lin (Ancient Chinese). Each faction had four classes at launch, with two more being added at the beginning of every season of the Faction War. The Vanguard class is described as well-balanced and has excellent offense and defense. The Assassin class is fast and efficient in dueling enemies, but the class deals much less damage to multiple enemies. The Heavies (Tanks) are more resistant to damage and are suitable for holding capture points, though their attacks are slow. The last class, known as 'Hybrid', is a combination of two of the three types, and is capable of using uncommon skills. All heroes are unique and have their own weapons, skills, and fighting styles. Players fight against their opponents with their class-specific melee weapons."),
("Forza", 0, "Forza is a series of simulation racing games for Xbox consoles, Windows 10, iOS and Android devices published by Xbox Game Studios. The series seeks to emulate the performance and handling characteristics of many real-life production, modified and racing cars. The franchise is primarily divided into two ongoing titles; the original Forza Motorsport series developed by American developer Turn 10 Studios, which focuses on primarily professional-style track racing events and series around a variety of both real and fictional tracks, and the Forza Horizon series mainly developed by British developer Playground Games, which revolves around a fictional racing and music festival called the 'Horizon Festival' and features open world environments set in fictional representations of real world areas in which players may freely roam and participate in racing events. Until 2019, each installment of the franchise series have alternated on a biennial basis; the Motorsport entries were released in odd-numbered years, while the Horizon entries were released in even-numbered years. This pattern was altered due to the absence of a new Motorsport game in 2019."),
("Tropico", 0, "Tropico is a series of construction and management simulation video games developed by PopTop Software. Regardless of any other stated victory condition, the main goal of any Tropico game is to stay in power. If the island's populace disapproves of the player's actions, they may vote their leader out of office. Individual factions and powers can also end or disrupt El Presidente's rule. Rebels can defeat the army and storm the Presidential palace. If the army is dissatisfied, it can stage a coup d'état. If 'El Presidente' manages to stay in positive view of the Soviet Union and the United States they will supply him with foreign aid money. If either of the Cold War superpowers becomes unhappy with the player's regime, it may launch an invasion to overthrow it. The superpowers may build a military base on Tropico, protecting the island from the other and offering monthly payments. If an army base is established in the country, it may ask for specific tasks, and low satisfaction will lead them to overthrow 'El Presidente'. "),
("Hades", 0, "Hades is a roguelike action role-playing video game developed and published by Supergiant Games. Players control Zagreus, the son of Hades, as he attempts to escape from Underworld to reach Mount Olympus, at times aided by gifts bestowed on him from the other Olympians. Each run challenges the player through a random series of rooms populated with enemies and rewards. The game has a hack and slash combat system; the player uses a combination of their main weapon attack, dash power, and magic ability to defeat them while avoiding damage to progress as far as possible. While Zagreus will often die, the player can use gained treasure to improve certain attributes or unlock new weapons and abilities to improve chances of escaping on subsequent runs. ");

INSERT INTO community_user_role (community_id, user_id, role_id)
VALUES
(1, 1, 1);

INSERT INTO forum_posts (author_id, community_id, title, type, image, text, active)
VALUES
(1, 1,'Sample Post 1', 'Image', 'data:image/jpeg;base64,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', NULL, 1),
(1, 1,'Sample Post 2', 'Post', NULL, 'Ipsum', 1),
(1, 1,'Sample Post 3', 'Link', NULL, 'https://www.google.com/', 1);

INSERT INTO forum_posts_comments (post_id, author_id, comment)
VALUES
(1, 1, 'Totally broooo!'),
(1, 1, 'Friggin owrsome');
