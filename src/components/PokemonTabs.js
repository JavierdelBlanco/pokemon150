import React from "react";
import '../styles/PokemonTabs.css';

const PokemonTabs = () => {
    
    const[visibility, setVisibility] = React.useState({
        normal: true,
        shiny: false
    });


    return (
            <ul className="main_list">
                <li className='normal' onClick={() => setVisibility({normal: true, shiny: false})}>
                    <div className="title">Normal</div>
                    <ul className="normal_list">
                        <li className={'normal_front ' + (visibility.normal ? 'visible' : 'invisible')}>Front</li>
                        <li className={'normal_back ' + (visibility.normal ? 'visible' : 'invisible')}>Back</li>
                    </ul>
                </li>
                <li className='shiny' onClick={() => setVisibility({normal: false, shiny: true})}>
                    <div className="title">Shiny</div>
                    <ul className="shiny_list">
                        <li className={'shiny_front ' + (visibility.shiny ? 'visible' : 'invisible')}>Front</li>
                        <li className={'shiny_back ' + (visibility.shiny ? 'visible' : 'invisible')}>Back</li>
                    </ul>
                </li>
            </ul>
    )
}

export { PokemonTabs }