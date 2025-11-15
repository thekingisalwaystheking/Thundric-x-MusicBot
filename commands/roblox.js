const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "roblox",
    description: "Starts a Roblox activity session in your voice channel",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["rb", "rblx"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {require("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **You must be in a voice channel to start a Roblox session!**");
        if(!message.member.voice.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE"))return client.sendTime(message.channel, "❌ | **Bot doesn't have Create Invite Permission**");

        let Invite = await message.member.voice.channel.activityInvite("880218394199220334")//Roblox activity ID
        let embed = new MessageEmbed()
        .setAuthor("Roblox", "https://images.rbxcdn.com/c69b74f49c6dfc72d0902ca34124e4ff")
        .setColor("#E03131")
        .setDescription(`
Using **Roblox** you can play Roblox games with your friends in a Voice Channel. Click *Join Roblox* to join in!

__**[Join Roblox](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** This only works in Desktop
`)
        message.channel.send(embed)
    },
    SlashCommand: {
        options: [
        ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | You must be in a voice channel to use this command.");
            if(!member.voice.channel.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"))return client.sendTime(interaction, "❌ | **Bot doesn't have Create Invite Permission**");

            let Invite = await member.voice.channel.activityInvite("880218394199220334")//Roblox activity ID
            let embed = new MessageEmbed()
            .setAuthor("Roblox", "https://images.rbxcdn.com/c69b74f49c6dfc72d0902ca34124e4ff")
            .setColor("#E03131")
            .setDescription(`
Using **Roblox** you can play Roblox games with your friends in a Voice Channel. Click *Join Roblox* to join in!

__**[Join Roblox](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** This only works in Desktop
`)
            interaction.send(embed.toJSON())
        },
    },
};
