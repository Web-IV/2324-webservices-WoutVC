const { tables } = require('..');

module.exports = {
	seed: async (knex) => {	
		await knex(tables.game).insert([{
			id: 1,
			name: 'Red Dead Redemption II',
			img: 'https://media.s-bol.com/vZ7pGz61A8xV/550x687.jpg',
			description: 'Een episch open wereld wild west spel met een meeslepend verhaal en realistische graphics.',
			console: 'PS4',
			category: 'RPG',
			categoryId: 1,
			prijs: 30,
		},
		{
			id: 2,
			name: 'Zelda Breath Of The Wild',
			img: 'https://media.s-bol.com/j83kyWl5jWvz/nGR2VY/518x840.jpg',
			description: 'Een adembenemend open wereld spel vol avontuur en puzzels in het koninkrijk van Hyrule.',
			console: 'Switch',
			category: 'Adventure',
			categoryId: 2,
			prijs: 40,
		},
		{
			id: 3,
			name: 'Minecraft',
			img: 'https://media.gamestop.com/i/gamestop/11098604/Minecraft-Starter-Collection---PlayStation-4',
			description: 'Een creatief en oneindig open wereld blokspel waarin je je eigen avonturen kunt bouwen en verkennen.',
			console: 'PS4',
			category: 'Sandbox',
			categoryId: 3,
			prijs: 20,
		},
		{
			id: 4,
			name: 'The Witcher 3: Wild Hunt',
			img: 'https://media.s-bol.com/mZwmnj0nXvjp/943x1200.jpg',
			description: 'Een gigantische open-wereld RPG met rijke verhaallijnen en actievolle gevechten.',
			console: 'PS4',
			category: 'RPG',
			categoryId: 1,
			prijs: 25,
		},
		{
			id: 5,
			name: 'Fortnite',
			img: 'https://i.pinimg.com/236x/5b/52/4d/5b524dcc589c3a9f0098884c2ff21d32.jpg',
			description: 'Een populaire battle royale game met bouwmechanica.',
			console: 'PC',
			category: 'Action',
			categoryId: 4,
			prijs: 0,
		},
		{
			id: 6,
			name: 'FIFA 22',
			img: 'https://media.s-bol.com/jMolDw6v6qlz/AVJpV3/947x1200.jpg',
			description: 'De nieuwste aflevering in de FIFA-serie, met realistische voetbalgameplay.',
			console: 'Xbox Series X',
			category: 'Sports',
			categoryId: 5,
			prijs: 50,
		},
		{
			id: 7,
			name: 'Grand Theft Auto V',
			img: 'https://media.s-bol.com/m8vgGWk5Q5WO/166XGyj/954x1200.jpg',
			description: 'Een actie-avontuur spel in een open wereld omgeving.',
			console: 'PS5',
			category: 'Action',
			categoryId: 4,
			prijs: 30,
		},
		{
			id: 8,
			name: 'Call of Duty: Warzone',
			img: 'https://cdn.mobygames.com/covers/3227605-call-of-duty-warzone-xbox-one-front-cover.jpg',
			description: 'Een gratis te spelen battle royale game met intense gevechten.',
			console: 'PC',
			category: 'Shooter',
			categoryId: 6,
			prijs: 0,
		},
		{
			id: 9,
			name: 'Assassin\'s Creed Valhalla',
			img: 'https://media.s-bol.com/M1gYRplQlBkA/xvKOyJz/550x707.jpg',
			description: 'Ga op een Vikingavontuur in deze actie RPG.',
			console: 'Xbox One',
			category: 'Adventure',
			categoryId: 2,
			prijs: 35,
		},
		{
			id: 10,
			name: 'Cyberpunk 2077',
			img: 'https://preview.redd.it/w44jvkcns8461.png?width=600&format=png&auto=webp&s=980eb031ccbda00eb31e37ec9830380efde2c363',
			description: 'Een futuristische RPG in de open wereld van Night City.',
			console: 'PC',
			category: 'RPG',
			categoryId: 1,
			prijs: 45,
		},
		{
			id: 11,
			name: 'Overwatch',
			img: 'https://media.s-bol.com/oXgXGkOWDBWk/K8z2W5R/947x1200.jpg',
			description: 'Een teamgebaseerde multiplayer schietspel met unieke helden.',
			console: 'PS4',
			category: 'Shooter',
			categoryId: 6,
			prijs: 25,
		},
		{
			id: 12,
			name: 'Super Mario Odyssey',
			img: 'https://media.s-bol.com/BQkYLnQAEvZn/QnLRzoq/740x1200.jpg',
			description: 'Ga samen met Mario op een 3D-platformavontuur om Princess Peach te redden.',
			console: 'Nintendo Switch',
			category: 'Platformer',
			categoryId: 7,
			prijs: 40,
		},
		{
			id: 13,
			name: 'The Last of Us Part II',
			img: 'https://media.s-bol.com/m654YB59o5pR/8JLEx2/949x1200.jpg',
			description: 'Een meeslepend actie-avontuur spel in een post-apocalyptische wereld.',
			console: 'PS5',
			category: 'Adventure',
			categoryId: 2,
			prijs: 30,
		},
		{
			id: 14,
			name: 'Rocket League',
			img: 'https://media.s-bol.com/APomK7GzAjB3/949x1200.jpg',
			description: 'Een krachtige mix van arcade-stijl voetbal en voertuigchaos.',
			console: 'Xbox One',
			category: 'Sports',
			categoryId: 5,
			prijs: 0,
		},
		{
			id: 15,
			name: 'Among Us',
			img: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg',
			description: 'Een sociaal deductiespel waar bemanningsleden imposters proberen te identificeren.',
			console: 'PC',
			category: 'Party',
			categoryId: 8,
			prijs: 0,
		},
		{
			id: 16,
			name: 'Hades',
			img: 'https://media.s-bol.com/6mL8gLoELJ6l/8qNZ5W3/518x840.jpg',
			description: 'Verken de onderwereld in deze actie RPG.',
			console: 'Nintendo Switch',
			category: 'RPG',
			categoryId: 1,
			prijs: 35,
		},
		]);
	},
};