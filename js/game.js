var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 1024,
    backgroundColor: '#0da1d2',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:600},
            embedded:true,
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var player,cursors,element,score,help;

var game = new Phaser.Game(config);

function preload(){
    this.load.image('tiles','../imgs/map.png');
    this.load.tilemapTiledJSON('map','../imgs/map.json');
    this.load.spritesheet('dude', '../imgs/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('star', '../imgs/star.png');
}

function create(){

    var map = this.make.tilemap({key:'map'});
    var tileset = map.addTilesetImage('asset','tiles');

    var ground = map.createStaticLayer('ground',tileset,0,0);
    var box = map.createStaticLayer('box',tileset,0,0);
    // var grass = map.createStaticLayer('grass',tileset,0,0);

    ground.setCollisionByProperty({collides:true});
    box.setCollisionByProperty({collides:true});

    var spawnPoint = map.findObject('player',function(obj){console.log(obj);return obj.name===''});
    map.setCollision([ 20, 48 ]);
    // player
    player = this.physics.add.sprite(spawnPoint.x,spawnPoint.y-20, 'dude');
    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player,ground,function(a,b){
        if (cursors.up.isDown)
        {
            player.setVelocityY(-80);
        }
    },null,this);
    this.physics.add.collider(player,box);

    // // star
    this.stars = map.createFromObjects('jewel','',{});
    this.starGroup = new Stars(this.physics.world,this,[],this.stars);

    this.physics.add.collider(player,this.starGroup,hitStar,null,this);
    camera
    var camera = this.cameras.main;
    camera.setBounds(0,0,map.widthInPixels,map.heightInPixels)
    camera.startFollow(player);

    // text
    score=0; 
    help = this.add.text(16, 16, 'Score:'+score, {
        fontSize: '18px',
        padding: { x: 10, y: 5 },
        // backgroundColor: '#000000',
        fill: '#ffffff'
    });
    help.setScrollFactor(0);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    cursors.up.on('down', function () {
        if (player.body.blocked.down)
        {
            player.body.setVelocityY(-400);
        }
    }, this);

    // debug 
    // var debug = this.add.graphics().setAlpha(0.7);
    // ground.renderDebug(debug,{
    //     tileColor:null,
    //     collidingTileColor:new Phaser.Display.Color(255,0,0),
    //     faceColor:new Phaser.Display.Color(0,255,0)
    // });
    
}

function update(){
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }else{
        player.setVelocityX(0);
    }
}

function hitStar(a,b){
    score++;
    help.text='Score:'+score;
    b.destroy();
    var stars = this.starGroup.children;
    if(stars.size===0){
        alert('You Win!')
    }
}