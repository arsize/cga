const promptList = [
    {
        name: "projectType",
        message: "请选择需要的项目模板",
        type: "list",
        choices: [
            {
                name: "vue",
                value: "vue",
                description: "一个vue项目",
                checked: true
            },
            {
                name: "react",
                value: "react",
                description: "一个react项目",
            }
        ]
    },
    {
        name: "checkVersion",
        when: answers => answers.projectType.includes("vue"),
        message: "选择版本",
        type: "list",
        choices: [
            {
                name: 'vue2',
                value: "vue2",
                description: "vue2项目",
                checked: true
            }, {
                name: "vue3",
                value: "vue3",
                description: "vue3项目",
            }
        ]
    }, {
        name: "modulesCustom",
        message: "是否需要自定义功能？",
        type: "list",
        choices: [
            {
                name: 'default',
                value: 'default',
                description: 'default',
                checked: true
            },
            {
                name: 'custom',
                value: 'custom',
                description: 'custom',

            }
        ]
    }, {
        name: "modulesList",
        when: answers => !answers.modulesCustom.includes("default"),
        message: "选择模块",
        type: "checkbox",
        choices: [
            {
                name: 'Babel',
                value: 'babel',
                description: 'babel',
            }, {
                name: 'Router',
                value: 'router',
                description: 'router'
            }, {
                name: 'TypeScript',
                value: 'typescript',
                description: 'typescript'
            }
        ]
    }, {
        name: "buildTools",
        when: answers => !answers.modulesCustom.includes("default"),
        message: "选择构建工具",
        type: "list",
        choices: [
            {
                name: 'webpack',
                value: 'webpack',
                description: 'webpack',
                checked: true
            },
            {
                name: 'vite',
                value: 'vite',
                description: 'vite',
                checked: true
            }
        ]
    }
]

module.exports = promptList