import CorpsePhysics from '@/videos/corpsephysics.mp4'
import Image from 'next/image'

export default function Blog() {
    return (
      <div>
        <h1> Dying Sprite: Behind The Scenes </h1>

        <p> This was by far the hardest project I have ever done. Here I will show you how I tackled some of the biggest challenges that came up in the project and how I solved them. </p>
        <Image
          src="/img/m4.jpeg"
          width={854}
          height={480}
          alt="Cover picture"
        />
        <Image
          src="/img/cover.jpeg"
          width={854}
          height={480}
          alt="Cover picture"
        />
        {/* <Image
          src="/img/infirmary.jpeg"
          width={854}
          height={480}
          alt="Cover picture"
        /> */}
        <Image
          src="/img/seats.jpeg"
          width={854}
          height={480}
          alt="Cover picture"
        />
        <Image
          src="/img/cell.jpeg"
          width={854}
          height={480}
          alt="Cover picture"
        />
        <h2> Body Physics, Dismemberment and Enemy Reactions </h2>
        <p> The game had to feature fully working limb hitboxes which should signal the player that the enemies react to it </p>
        <p> I solved the problems by creating a ragdoll while using these created newly created physics bones as hitboxes. This made it possible to assign different damage multipliers based on the limb. </p>
        <p> Creating hanging bodies was also possible and works with the shooting </p>
        <div> When the enemy is killed an amplified force is applied on the limb causing the body to fly backwards and the limb disappears and splatters blood all over. Creating very satisfying feedback. </div>
        <div> The more damage the enemy gets the more he walks forward in an injured way which made it possible to see ememy health instinctively without having a big ugly healthbar over their head</div>
        <br/>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/2yREx-M7JAM?si=iE7YsA4GT0AED5lM" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope;
        picture-in-picture;
        web-share"
        referrerPolicy="strict-origin-when-cross-origin">
        </iframe>
        <h2> Pathfinding in a big map </h2>
        <p> Pathfinding was a major concern since just generating a NavMesh for the Map was not feasibile. The game would run at 25 FPS consistently when more than 20 Enemies were on the map. This is obviously bad when we have continuous spawning </p>
        <h3> The solution: A* Pathfinding </h3>
        <p> I have used the A* Pathfinding Package which drastically improved performance. The paid version also has the ability to dynamically create NavMeshes fast (not in realtime but still fast). Perfect for the game. The only issue is that when exporting the enemies fly slightly above the ground. Cant be fixed but has been fixed in the new unity version in the making of this blogpost </p>

        <h2> Procedural Animation System </h2>
        <p> At first I tried to create an animation for everything but I quickly faced a problem with this approach. You need a transition to each state and these states must transition to other states to work correctly </p>

        <h2> Movement </h2>
        <p> The game has many movement systems like sprinting, sliding, grappling hooks, wallrunning, wallclimbing, walljumping and shoulderpeeking. </p>

        <h2> Sacrifices </h2>
        <p> Although many things have been implemented as I imagined not everything went over smoothly. For instance: Remember the A* Pathfinding Package. Its amazing but not realtime which made the chase concept impossible to implement.</p>
        <p> This was kind of a bummer since doing this puzzle while being chased by a hoard with the music getting more intense by the second was just too cool to not implement. But it is what it is </p>
        <p> I also had to hide the grappling hook ability as an easter egg since it broke the game</p>

        <h2> Lighting </h2>
        <p> I increased the PBR Metalness to give weapons this beautiful shine on the sun and I chose the colors of the HDRI in a way to give the map a strong breaking bad inspired stylized look </p>
      </div>
    );
  }