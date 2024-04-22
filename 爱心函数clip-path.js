function generateSmoothHeartPoints(numPoints = 100, radius = 1, offsetX = 0, offsetY = 0) {
          const points = [];
          const angleIncrement = (2 * Math.PI) / numPoints;
        
          for (let i = 0; i < numPoints; i++) {
            const angle = angleIncrement * i;
            let x = radius * (16 * Math.pow(Math.sin(angle), 3));
            let y = -radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        
            // 调整位置和大小
            x = (x + radius) / (2 * radius) * 5 + offsetX;
            y = (y + radius) / (2 * radius) * 5 + offsetY;
        
            points.push(`${x}% ${y}%`);
          }
        
          return points.join(', ');
        }
        dom.style.clipPath = `polygon(${generateSmoothHeartPoints(90,1,50,50)})`;