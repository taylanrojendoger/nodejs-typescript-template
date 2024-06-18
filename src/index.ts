// Alias Package
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    "@configs": `${__dirname}/configs`,
    "@controllers": `${__dirname}/controllers`,
    "@models": `${__dirname}/modules`,
    "@providers": `${__dirname}/providers`,
    "@routes": `${__dirname}/routes`,
    "@scripts": `${__dirname}/scripts`,
    "@services": `${__dirname}/services`
});

// Dotenv
require('dotenv').config();

// App
import AppProvider from '@providers/app-provider';

AppProvider.init();