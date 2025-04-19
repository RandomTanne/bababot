const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gets a random quote (currently limited to the latest 100 messages)'),
	async execute(interaction) {
		const quotesChannel = interaction.guild.channels.cache.filter(channel => channel.name === 'quotes').values().next().value

		if(!quotesChannel) {
			return await interaction.reply('Server has no quotes channel');
		}

		const quote = await quotesChannel.messages.fetch({ limit: 100 }).then(messages => {
			const quotes = [];
			messages.forEach(msg => {
				msg = msg.content
				if((msg.includes("'") || msg.includes('"')) && msg.includes('-')) {
					quotes.push(msg)
				}
			});
			return quotes[Math.floor(Math.random()*quotes.length)];
		})

		await interaction.reply(quote || 'No quote found');
	},
};
