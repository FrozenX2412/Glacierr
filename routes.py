from flask import render_template, request, flash, redirect, url_for, jsonify
from app import app
from forms import ApplicationForm
from datetime import datetime

# Mock data for the website
SERVER_INFO = {
    'name': 'GLACIERMC',
    'ip': 'play.glaciermc.in',
    'discord': 'https://discord.gg/Z7AYjmhx4N',
    'version': '1.20.1',
    'online_players': 0,
    'max_players': 500,
    'owner': 'FrozenX',
    'description': 'Dive in the Wolrd of endless fun and make this season more merorable! Join our thriving community with custom gamemodes, events, and endless fun.'
}

GAMEMODES = [
    {'name': 'Survival', 'description': 'Classic survival experience with custom features', 'players': 45},
    {'name': 'Creative', 'description': 'Build without limits in our creative world', 'players': 32},
    {'name': 'SkyBlock', 'description': 'Start from nothing and build your island empire', 'players': 38},
    {'name': 'Prison', 'description': 'Mine, rank up, and become the richest player', 'players': 25},
    {'name': 'Factions', 'description': 'Build your faction and conquer territories', 'players': 10}
]

UPDATES = [
    {
        'title': 'Halloween Update 2024',
        'date': '2024-10-01',
        'content': 'Spooky decorations, new Halloween crates, and limited-time events!',
        'version': '3.2.1'
    },
    {
        'title': 'New SkyBlock Features',
        'date': '2024-09-15',
        'content': 'Added custom islands, new challenges, and improved marketplace.',
        'version': '3.2.0'
    },
    {
        'title': 'Prison Revamp',
        'date': '2024-09-01',
        'content': 'Complete overhaul of the prison system with new mines and ranks.',
        'version': '3.1.5'
    },
    {
        'title': 'Bug Fixes & Performance',
        'date': '2024-08-20',
        'content': 'Various bug fixes and server performance improvements.',
        'version': '3.1.4'
    }
]

STORE_ITEMS = {
    'ranks': [
        {'name': 'VIP', 'price': 5.99, 'color': '#00ff00', 'perks': ['Colored chat', 'Join full server', '2x XP boost']},
        {'name': 'VIP+', 'price': 9.99, 'color': '#00ffff', 'perks': ['All VIP perks', 'Fly in lobby', '3x XP boost', 'Monthly crate key']},
        {'name': 'MVP', 'price': 19.99, 'color': '#ff6600', 'perks': ['All VIP+ perks', 'Custom commands', '5x XP boost', 'Weekly crate keys']},
        {'name': 'MVP+', 'price': 39.99, 'color': '#ff0066', 'perks': ['All MVP perks', 'Custom nicknames', '10x XP boost', 'Daily crate keys']}
    ],
    'coins': [
        {'amount': '1,000', 'price': 1.99, 'bonus': '0'},
        {'amount': '5,000', 'price': 8.99, 'bonus': '500'},
        {'amount': '10,000', 'price': 15.99, 'bonus': '1,500'},
        {'amount': '25,000', 'price': 34.99, 'bonus': '5,000'}
    ]
}

VOTING_SITES = [
    {'name': 'MinecraftServers.org', 'url': 'https://minecraftservers.org/vote/123456', 'reward': '5 Vote Keys'},
    {'name': 'Minecraft-Server-List.com', 'url': 'https://minecraft-server-list.com/vote/123456', 'reward': '3 Vote Keys'},
    {'name': 'TopG.org', 'url': 'https://topg.org/minecraft-servers/vote-123456', 'reward': '4 Vote Keys'},
    {'name': 'MinecraftMP.com', 'url': 'https://minecraftmp.com/vote/123456', 'reward': '6 Vote Keys'},
    {'name': 'TopMinecraftServers.org', 'url': 'https://topminecraftservers.org/vote/123456', 'reward': '5 Vote Keys'},
    {'name': 'MinStatus.net', 'url': 'https://minstatus.net/vote/123456', 'reward': '7 Vote Keys'}
]

@app.route('/')
def index():
    return render_template('index.html', 
                         server_info=SERVER_INFO, 
                         gamemodes=GAMEMODES)

@app.route('/updates')
def updates():
    return render_template('updates.html', updates=UPDATES)

@app.route('/store')
def store():
    return render_template('store.html', store_items=STORE_ITEMS)

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/vote')
def vote():
    return render_template('vote.html', voting_sites=VOTING_SITES)

@app.route('/application', methods=['GET', 'POST'])
def application():
    form = ApplicationForm()
    
    if form.validate_on_submit():
        # In a real application, you would save this to a database
        flash(f'Application for {form.position.data} submitted successfully! We will review your application and get back to you soon.', 'success')
        return redirect(url_for('application'))
    
    return render_template('application.html', form=form)

@app.context_processor
def inject_current_year():
    return {'current_year': datetime.now().year}
