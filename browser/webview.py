from pathlib import Path

from pgi import require_version

require_version('Gtk', '3.0')
require_version('WebKit2', '4.0')

from pgi.repository import Gtk, WebKit2

current_path = Path(__file__).parent.resolve()

class Browser:
    def __init__(self):
        self.builder = Gtk.Builder()

        self.builder.add_from_file(f"{current_path}/interface.glade")
        self.builder.connect_signals(self)

        self.window = self.builder.get_object("window1")
        self.window.connect('destroy', lambda w: Gtk.main_quit())
        self.scrolledwindow = self.builder.get_object("scrolledwindow")
        self.window.show_all()

        self.webview = WebKit2.WebView()
        self.scrolledwindow.add(self.webview)
        self.webview.load_uri('http://localhost:7351')
        self.webview.show()


def main() -> None:
    Browser()
    Gtk.main()
