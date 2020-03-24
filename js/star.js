var Star = new Phaser.Class({

    Extends: Phaser.Physics.Arcade.Sprite,

    initialize:

    function Star (scene, x, y)
    {
        Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'star',0);
        this.scene = scene;
        // add to scene
        this.scene.add.existing(this);
    }
});

var Stars = new Phaser.Class({
    Extends: Phaser.Physics.Arcade.StaticGroup,
    initialize:function(world,scene,children,spriteArray){
        Phaser.Physics.Arcade.StaticGroup.call(this,world,scene,children,{collideWorldBounds:true,allowGravity:false});
        this.scene = scene;
        this.createStars(scene,spriteArray);
        this.scene.physics.world.enable(this,Phaser.Physics.Arcade.STATIC_BODY);
    },
    createStars:function(scene,spriteArray){
        var that = this;
        var stars = [];
        spriteArray.forEach(function(sprite){
            var star = new Star(scene,sprite.x,sprite.y);
            that.add(star);
            stars.push(star);
            sprite.destroy();
        });
        this.move(stars);
    },
    move:function(stars){
        
        var tween = this.scene.tweens.add({
            targets: stars,
            y:function(a,b){return a[b]+10;},
            duration: 600,
            ease: 'ease',
            yoyo: true,
            loop: -1
        });
    }
});