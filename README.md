# VPP Nexus - Virtual Power Plant Energy Management Dashboard

A comprehensive energy management dashboard for virtual power plants, featuring real-time monitoring, analytics, simulation, and reporting capabilities.

## 🚀 Features

- **Real-time Dashboard**: Live energy flow monitoring with key metrics
- **Digital Twin**: Interactive campus map with asset visualization
- **Advanced Analytics**: AI-powered insights and forecasting
- **What-If Simulator**: Scenario testing and optimization
- **Energy Reports**: Comprehensive reporting with data export
- **System Settings**: Configurable alerts and thresholds

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Date Handling**: date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd VPP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment on Render

### Automatic Deployment

1. **Connect your GitHub repository to Render**
   - Go to [render.com](https://render.com)
   - Sign up/login with your GitHub account
   - Click "New +" and select "Static Site"

2. **Configure the deployment**
   - **Name**: `vpp-nexus` (or your preferred name)
   - **Repository**: Select your GitHub repository
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of the project)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Environment Variables** (Optional)
   - `NODE_ENV`: `production`

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your application

### Manual Deployment

If you prefer to deploy manually or need custom configuration:

1. **Build the project locally**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder contents to your hosting provider**

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=VPP Nexus
VITE_APP_VERSION=1.0.0
```

### Customization

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Components**: All UI components are in `src/components/ui/`
- **Pages**: Main application pages are in `src/Pages/`
- **Data**: Mock data entities are in `src/entities/`

## 📁 Project Structure

```
VPP/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   ├── digitaltwin/  # Digital twin components
│   │   ├── reports/      # Report components
│   │   └── simulator/    # Simulator components
│   ├── Pages/            # Main application pages
│   ├── entities/         # Data models and mock APIs
│   ├── integrations/     # External service integrations
│   ├── utils/            # Utility functions
│   ├── Layout.jsx        # Main layout component
│   ├── App.jsx           # Root application component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── render.yaml           # Render deployment configuration
```

## 🎨 UI Components

The application uses a custom component library built on top of Tailwind CSS:

- **Card**: Container components with consistent styling
- **Button**: Various button styles and sizes
- **Input**: Form input components
- **Badge**: Status and category indicators
- **Switch**: Toggle controls
- **Select**: Dropdown selections
- **Sidebar**: Navigation sidebar with responsive behavior

## 📊 Data Visualization

Charts and graphs are powered by Recharts:

- **Line Charts**: Time-series data (energy flow, trends)
- **Area Charts**: Forecasted data with gradients
- **Bar Charts**: Comparative data (costs, savings)
- **Pie Charts**: Energy source distribution

## 🔄 Real-time Features

- **Live Data Updates**: Dashboard refreshes every 5 seconds
- **Asset Monitoring**: Real-time asset status updates
- **Alert System**: Dynamic alert generation and management
- **Simulation Engine**: AI-powered scenario testing

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic chunk splitting for better loading
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized assets and icons
- **Bundle Analysis**: Built-in bundle size monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Ensure Node.js version is 16+ 
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

2. **Styling Issues**
   - Check Tailwind CSS configuration
   - Verify PostCSS setup

3. **Deployment Issues**
   - Check build command in Render configuration
   - Verify publish directory is set to `dist`

### Development Tips

- Use `npm run preview` to test production build locally
- Check browser console for any runtime errors
- Use React Developer Tools for component debugging

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the component examples in `/src/components`

---

**VPP Nexus** - Empowering sustainable energy management through intelligent technology.
