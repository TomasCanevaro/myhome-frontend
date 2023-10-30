import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import PreLogin from "../LogeoInmobiliaria/preLogin";

const Drawer = createDrawerNavigator()

export default function DrawerNavigation(){
    return(

        <Drawer.Navigator>
            <Drawer.Screen name = "ProfileScreen" component={PreLogin} />
            <Drawer.Screen name = "ProfileScreen" component={PreLogin} />
        </Drawer.Navigator>
    )
}