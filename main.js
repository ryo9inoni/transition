import '@babel/polyfill';

// event
import INIT from './event/init'; 
import SEARCH from './event/search'; 
import ANCHOR from './event/anchor'; 
import WAY from './event/way';
import QUERY from './event/query';

new INIT();
new SEARCH();
new ANCHOR();
new WAY();
new QUERY();