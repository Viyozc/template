// "./" 指的是项目主目录
var src  = './_app';
var dest = './build';

module.exports = {
    js: {
        babel: {
            src: src + "/_es6/**/*.js",
            dest: src+"/js"
        },
        copy:{
            src: src+"/_es6/**/*.node",
            dest: src+'/js'
        },
        source: {
            src: src+'/js/**/*.{node,css}',
            dest: dest + '/js'
        },
        nodeModules: {
            scr: [src + "/node_modules/**/*.{js,json}",
                // '!' + src + '/node_modules/**/{test,example}.js',
                '!' + src + '/node_modules/**/test/**/*',
                '!' + src + '/node_modules/**/cordova/**/*',
                '!' + src + '/node_modules/**/example/**/*',
                '!' + src + '/node_modules/**/examples/**/*',
                '!' + src + '/node_modules/**/mobile/**/*',
                '!' + src + '/node_modules/**/gulpfile.js'
            ],
            dest: dest + '/node_modules'
        },
        ugly: {
            src: src + "/js/**/*.js",
            dest: dest+"/js"
        },
        nodeModulesUglify: {
            src: dest + "/node_modules/**/*.js",
            dest: dest + '/node_modules'
        }
    },
    css: {
        copy: {
            src: src + "/_scss/**/*.otf",
            dest: src+"/css"
        },
        sass:{
            src: src + "/_scss/**/*.scss",
            dest: src+"/css"
        },
        build: {
            src: src+"/css/**/*",
            dest: dest + "/css"
        }
    },
    html: {
        src: [src + "/**/*.{html,json}",
            '!' + src + "/node_modules/**/*"
        ],
        dest: dest + "/"
    },
    img: {
        src: src + "/resource/img/**/*",
        dest: dest + "/resource/img"
    },
    clean: {
        src: [dest + "/**/*",
             '!' + dest + '/node_modules/**/*']
    },
    data: {
        src: src + '/data/**/*',
        dest: dest + '/data'
    }
};