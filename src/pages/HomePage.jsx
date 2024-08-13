import { NavLink } from "react-router-dom";

export function HomePage() {
    return <section className="home-page">
        <div className="welcome">
            <img className="xbox-img" src="/src/assets/imgs/welcome.jpg" alt="" />
            <img className="plane-img" src="/src/assets/imgs/plane.jpg" alt="" />
            <img className="teddy-img" src="/src/assets/imgs/xbox.jpg" alt="" />
            <h2>WELCOME TO TOY STORE</h2>
            <a className="shop-now" href="">Shop Now</a>
            <a className="our-story" href="">Our Story</a>
        </div>
    </section>
}