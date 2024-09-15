document.addEventListener('DOMContentLoaded', () => {
    const commandsList = document.getElementById('commandsList');
    const commandSearch = document.getElementById('commandSearch');
    const commands = [
        { category: 'fun', command: '..meme', description: 'Get a random meme', syntax: '..meme' },
        { category: 'fun', command: '..joke', description: 'Get a random joke', syntax: '..joke' },
        { category: 'fun', command: '..roll', description: 'Roll a dice', syntax: '..roll' },
        { category: 'fun', command: '..coin-flip', description: 'Flip a coin', syntax: '..coin-flip' },
        { category: 'fun', command: '..8ball', description: 'Ask the magic 8 ball', syntax: '..8ball <question>' },
        { category: 'fun', command: '..ship', description: 'Ship two people', syntax: '..ship <user1> <user2>' },
        { category: 'fun', command: '..td', description: 'Truth or Dare', syntax: '..td' },

        { category: 'general', command: '..ping', description: 'Get bot\'s host server status & latency', syntax: '..ping' },
        { category: 'general', command: '..serverinfo', description: 'Get server information', syntax: '..serverinfo' },
        { category: 'general', command: '..poll', description: 'Create a poll', syntax: '..poll <question>' },
        { category: 'general', command: '..userinfo', description: 'Get user information', syntax: '..userinfo <user>' },
        { category: 'general', command: '..avatar', description: 'Get user avatar', syntax: '..avatar <user>' },
        { category: 'general', command: '..botinfo', description: 'Get bot information', syntax: '..botinfo' },
        { category: 'general', command: '..uptime', description: 'Get bot uptime', syntax: '..uptime' },
        { category: 'general', command: '..help', description: 'Bot\'s help menu', syntax: '..help' },

        { category: 'music', command: '..play', description: 'Play a song', syntax: '..play <song>' },
        { category: 'music', command: '..stop', description: 'Stop the music', syntax: '..stop' },
        { category: 'music', command: '..skip', description: 'Skip the current song', syntax: '..skip' },
        { category: 'music', command: '..pause', description: 'Pause the music', syntax: '..pause' },
        { category: 'music', command: '..resume', description: 'Resume the music', syntax: '..resume' },
        { category: 'music', command: '..search', description: 'Search for a song', syntax: '..search <song>' },
        { category: 'music', command: '..queue', description: 'Show the music queue', syntax: '..queue' },
        { category: 'music', command: '..lyrics', description: 'Get lyrics for the current song', syntax: '..lyrics' },
        { category: 'music', command: '..addqueue', description: 'Add a song to the queue', syntax: '..addqueue <song>' },
        { category: 'music', command: '..removequeue', description: 'Remove a song from the queue', syntax: '..removequeue <song>' },
        { category: 'music', command: '..syncedlyrics', description: 'Get synced lyrics for the current song', syntax: '..syncedlyrics' },

        { category: 'utility', command: '..setprefix', description: 'Set bot prefix', syntax: '..setprefix <prefix>' },
        { category: 'utility', command: '..kick', description: 'Kick a member', syntax: '..kick @member' },
        { category: 'utility', command: '..ban', description: 'Ban a member', syntax: '..ban @member' },
        { category: 'utility', command: '..unban', description: 'Unban a member', syntax: '..unban @member' },
        { category: 'utility', command: '..warn', description: 'Warn a member', syntax: '..warn @member' },
        { category: 'utility', command: '..clear', description: 'Clear messages', syntax: '..clear <number>' },
        { category: 'utility', command: '..say', description: 'Make the bot say something', syntax: '..say <message>' },
        { category: 'utility', command: '..lock', description: 'Lock a channel', syntax: '..lock' },
        { category: 'utility', command: '..setlogchannel', description: 'Set log channel', syntax: '..setlogchannel <channel>' },
        { category: 'utility', command: '..unlock', description: 'Unlock a channel', syntax: '..unlock' },
        { category: 'utility', command: '..remind', description: 'Set a reminder', syntax: '..remind <time> <message>' },
        { category: 'utility', command: '..weather', description: 'Get weather information', syntax: '..weather <location>' },
        { category: 'utility', command: '..translate', description: 'Translate text', syntax: '..translate <language> <text>' },
        { category: 'utility', command: '..rate', description: 'Rate something', syntax: '..rate <thing>' },
        { category: 'utility', command: '..report', description: 'Report a user', syntax: '..report <user> <reason>' },

        // Slash Commands
        { category: 'slash', command: '/meme', description: 'Get a random meme', syntax: '/meme' },
        { category: 'slash', command: '/joke', description: 'Get a random joke', syntax: '/joke' },

        { category: 'slash', command: '/ping', description: 'Get bot\'s host server status & latency', syntax: '/ping' },
        { category: 'slash', command: '/userinfo', description: 'Get user information', syntax: '/userinfo <user>' },
        { category: 'slash', command: '/help', description: 'Bot\'s help menu', syntax: '/help' },

        { category: 'slash', command: '/kick', description: 'Kick a member', syntax: '/kick @member' },

        { category: 'slash', command: '/lyrics', description: 'Get lyrics for the current song', syntax: '/lyrics' }
    ];

    const renderCommands = (filter = 'all') => {
        commandsList.innerHTML = '';
        const filteredCommands = commands.filter(cmd => filter === 'all' || cmd.category === filter);
        filteredCommands.forEach(cmd => {
            const commandItem = document.createElement('div');
            commandItem.classList.add('command-item', 'animate__animated', 'animate__fadeIn');
            commandItem.innerHTML = `<h5>${cmd.command}</h5><p>${cmd.description}</p><p><strong>Syntax:</strong> ${cmd.syntax}</p>`;
            commandsList.appendChild(commandItem);
        });
    };

    const showCommands = (category) => {
        renderCommands(category);
        document.querySelectorAll('.list-group-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.list-group-item[data-category="${category}"]`).classList.add('active');
    };

    const searchCommands = () => {
        const searchTerm = document.getElementById('commandSearch').value.toLowerCase();
        const filteredCommands = commands.filter(cmd => cmd.command.toLowerCase().includes(searchTerm));
        commandsList.innerHTML = '';
        filteredCommands.forEach(cmd => {
            const commandItem = document.createElement('div');
            commandItem.classList.add('command-item', 'animate__animated', 'animate__fadeIn');
            commandItem.innerHTML = `<h5>${cmd.command}</h5><p>${cmd.description}</p><p><strong>Syntax:</strong> ${cmd.syntax}</p>`;
            commandsList.appendChild(commandItem);
        });
    };

    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', () => showCommands(item.getAttribute('data-category')));
    });

    commandSearch.addEventListener('input', searchCommands);

    renderCommands();
});