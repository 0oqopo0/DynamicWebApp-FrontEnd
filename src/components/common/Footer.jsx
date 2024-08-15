
import React from 'react';

const FooterComponent = () => {
return (
<div className="bg-gray-800 text-white py-4">
<footer className="container mx-auto text-center">
<span>M.Sh Dev | All Rights Reserved © {new Date().getFullYear()}</span>
</footer>
</div>
);
}

export default FooterComponent;
