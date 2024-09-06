export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', menus: [
            { name: 'menu.admin.crud', link: '/system/user-manage' },
            { name: 'menu.admin.crud-redux', link: '/system/user-redux' },
            {  name: 'menu.admin.manage-doctor',link: '/system/manage-doctor'},
            { name: 'menu.doctor.manage-schedule', link: '/doctor/schedule-manage' },
            // { name: 'menu.admin.manage-admin', link: '/system/manage-admin' },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    //quan ly phong kham
    {  name: 'menu.admin.clinic', menus: [
        {  name: 'menu.admin.manage-clinic',link: '/system/manage-clinic'},
        // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ]}, 
    //quan ly chuyen khoa
    {  name: 'menu.admin.specialty', menus: [
        {  name: 'menu.admin.manage-specialty',link: '/system/manage-specialty'},
        // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ]}, 
    //quan ly cam nang
    {  name: 'menu.admin.handbook', menus: [
        {  name: 'menu.admin.manage-handbook',link: '/system/manage-handbook'},
        // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ]},


];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user', menus: [
             // Quản lý kế hoạch khám bệnh
            { name: 'menu.doctor.manage-schedule', link: '/doctor/schedule-manage' }, 
        ]
    }
];