import react, { useState } from 'react'

const Tabs = ({tabs}) => {
const [activeTab, setActiveTab] = useState(0);
    return (
        <div>
            <div>
                {tabs.map((tab, index) =>
                (<button key={tab} onClick={() => setActiveTab(index)} style={{
              fontWeight: activeTab === index ? 'bold' : 'normal'
            }}>{tab.label}</button>))
                }
            </div>
            <div>
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;