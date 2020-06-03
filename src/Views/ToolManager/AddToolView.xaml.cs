using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace Yatsugi.Views
{
    public class AddToolView : UserControl
    {
        public AddToolView()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }
    }
}