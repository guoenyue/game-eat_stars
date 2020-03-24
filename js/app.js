var config={
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1b262c',
    parent: 'phaser-example',
    // pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 20 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player,cursors,txt,i;

var game = new Phaser.Game(config);

function preload(){
    this.load.spritesheet('left', '/imgs/left.png', { frameWidth: 84.5, frameHeight: 79 });
    this.load.spritesheet('right', '/imgs/right.png', { frameWidth: 85, frameHeight: 79 });
    this.load.spritesheet('up', '/imgs/up.png', { frameWidth: 44.24, frameHeight: 81 });
    this.load.spritesheet('down', '/imgs/down.png', { frameWidth: 44.26, frameHeight: 81 });
    this.load.bitmapFont('number', '/imgs/number.png', '/font/number.xml');
}

function create(){
    console.log(this.anims);
    i=0;
    // this.add.bitmapText(0,0,'number','0'); 
    player = this.physics.add.sprite(700, 450, 'right');
    txt = this.add.bitmapText(0, 100, 'number', '',20);
    txt2 = this.add.bitmapText(0, 140, 'number', '',20);
    player.setBounce(0.8);
    // player.set(0.8);
    player.setCollideWorldBounds(true);
    let ani1 = this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('right', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('up', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('left', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('down', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    this.input.on('pointerdown',function(pointer){
        console.log(pointer,'pointer');
        txt.text='x:'+pointer.x;
        txt2.text='y:'+pointer.y;
    })
    player.setInteractive();
    player.on('pointerdown',function(pointer){
        console.log(pointer,'player')
    })

    this.input.setDraggable(player);

    player.on('drag', function (pointer, dragX, dragY) {
        console.log('drag');
        player.x = dragX;
        player.y = dragY;

    });
    console.log(ani1);
    console.log(player);
    player.anims.play('right');
}

function update(time,delta){
    // console.log(time,delta);
    if(cursors.up.isDown){
        player.setVelocityX(0);
        player.anims.play('up', true);
        player.setVelocityY(-60);
    }else if(cursors.right.isDown){
        player.setVelocityY(0);
        player.anims.play('right', true);
        player.setVelocityX(60);
        console.log(player);
    }else if(cursors.left.isDown){
        player.setVelocityY(0);
        player.anims.play('left', true);
        player.setVelocityX(-60);
    }else if(cursors.down.isDown){
        player.anims.play('down', true);
        player.setVelocityX(0);
        player.setVelocityY(60);
    }
    else
    {
        player.setVelocityX(0);
        player.setVelocityY(0);
        // player.anims.play('right');
    }
    // if(cursors.right.isDown){
    // }else{
    //     player.setVelocityX(0);
    //     player.anims.play('right', true);
    // }
}