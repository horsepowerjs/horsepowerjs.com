const fs = require('fs')
const gulp = require('gulp')
const path = require('path')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const ts = require('gulp-typescript')

// @ts-ignore
sass.compiler = require('node-sass')

const isProd = process.argv.includes('--production')

const tasks = ['sass', 'javascript', 'typescript']

gulp.task('sass', gulp.series(() => {
  const build = gulp.src(path.join(__dirname, 'resources/assets/styles', '**/*.{scss,sass,css}'))

  if (isProd) build.pipe(sass({ outputStyle: 'compressed' }))
  else build.pipe(sass({ outputStyle: 'expanded' }))

  return build.on('error', sass.logError)
    .pipe(gulp.dest(path.join(__dirname, 'public/css')))
}))

gulp.task('javascript', gulp.series(() => {
  const build = gulp.src(path.join(__dirname, 'resources/assets/javascript', '**/*.js'))
  isProd && build.pipe(uglify()).pipe(concat('app.min.js')) || build.pipe(concat('app.js'))
  return build.pipe(gulp.dest(path.join(__dirname, 'public/js')))
}))

gulp.task('typescript', gulp.series(() => {
  let tsconfig = path.join(__dirname, 'resources/assets/typescript/tsconfig.json')
  if (!fs.existsSync(tsconfig)) return Promise.resolve()
  const tsProject = ts.createProject(tsconfig)
  tsProject.config.compilerOptions.outDir = 'public/js'

  const tsResult = tsProject.src().pipe(tsProject())

  const build = tsResult.js
  isProd && build.pipe(uglify()).pipe(concat('app.min.js')) || build.pipe(concat('app.js'))
  return build.pipe(gulp.dest(path.join(__dirname, 'public/js')))
}))

gulp.task('build:watch', gulp.series([...tasks, () => {
  gulp.watch(path.join(__dirname, 'resources/assets/styles', '**/*.{sass,scss,css}'), gulp.series('sass'))
  gulp.watch(path.join(__dirname, 'resources/assets/javascript', '**/*.js'), gulp.series('javascript'))
  gulp.watch(path.join(__dirname, 'resources/assets/typescript', '**/*.ts'), gulp.series('typescript'))
}]))

gulp.task('build', gulp.series(...tasks))