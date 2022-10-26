// caOS
// (c) 2022 Star Inc.
"use strict";

const gi = require('node-gtk')
const Gtk = gi.require('Gtk', '3.0')
const WebKit2 = gi.require('WebKit2')

gi.startLoop()
Gtk.init()

const window = new Gtk.Window({
    type: Gtk.WindowType.TOPLEVEL
})

const webView = new WebKit2.WebView()
const scrollWindow = new Gtk.ScrolledWindow({})
scrollWindow.add(webView)

const vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL })
vbox.packStart(scrollWindow, true, true, 0)
window.add(vbox)

window.setDefaultSize(1024, 720)
window.setResizable(true)

window.on('show', () => {
    Gtk.main()
})

window.on('destroy', () => Gtk.mainQuit())

window.on('delete-event', () => false)

module.exports = () => {
    webView.loadUri('https://start.starinc.xyz')
    window.showAll()
}
