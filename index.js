const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const channelId = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]; // channel IDs

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot is ready`);
  console.log(`Code by 约 - Wick`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!channelId.includes(message.channel.id)) return;

  const codeBlockRegex = /```([a-zA-Z]+)\n([\s\S]+)```/;

  const codeMatch = message.content.match(codeBlockRegex);
  if (codeMatch) {
    const [, language, code] = codeMatch;

    const embed = new MessageEmbed()
      .setColor('#7289DA')
      .setTitle(`Your Bot`)
      .setDescription('```' + language + '\n' + code + '\n```')
      .setTimestamp()
      .addField('Added by : ', `<@${message.author.id}>`, true)
      .addField('Code Type : ', language, true);

    const copyButton = new MessageButton()
      .setCustomId('copy_code')
      .setLabel('Copy Code')
      .setStyle('PRIMARY');

    const row = new MessageActionRow().addComponents(copyButton);

    const sentEmbed = await message.channel.send({ embeds: [embed], components: [row] });

    const collector = sentEmbed.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'copy_code') {
        await interaction.reply({ content: '```' + language + '\n' + code + '```\n', ephemeral: true });
      }
    });

    message.delete();
  }
});

// bot token
client.login('Your_Bot_Token');
