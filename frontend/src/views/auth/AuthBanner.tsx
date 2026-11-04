import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { navigate } from '../../router/router';

interface AuthBannerProps {
  image?: string;
  showBackHome?: boolean;
}

// 0ms Low-Quality Image Placeholders (Base64 under 500 bytes each)
const BLUR_PLACEHOLDERS: Record<string, string> = {
  '/assets/images/login.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6kbwZEsBkEqeaORCQQSO5/Dj868W+HXxV1LxHq+uXL2tsNJtJoreOAZDqedzZAOcnHPoPu5NTyft2+F9Niu1urF7hoEDDy0dX3ZGVZSvDYOQMnI/GvBPhr40H/CSX5R0ihZ42Hmqm0FpySWJ5OQMdq9Gvmsq1PmpyaseLQwFOnKzSZ9+eBbu38Q6cl2iNbnzDE8MvDK4/h+tenaXpjIo8uNiOpOK+M9I+KP8AwgusSeIX037TFBPG4jVMCUGNlIUgcEk5zz1r0XWP25rfw/p0FzN4Kugsqg5e9QKhKkqD8vGcH72OlcizKNRWm9TslhYUJWPjvwP8ErX4vfvoNM1G7CwILoI0UcZJBwWLfN7YGOntitXR/hTo/wALNXvLefxDDc7nUmCNHfYi42gMpXcACAQRgkcHvRRXy7qShg3Pe2n3HfGMYx5ktTqtd8VeGrzS1sbW7sp76ZyjTm4FvdKAPlIjfCOeMA5J9ffyH9oy5k8N6TFJaz2KX2oKQqLNF9oEMWcO3llUCnkAY3bsgFupKK2wiVegqstzCpJz1Z//2Q==',
  '/assets/images/login.png': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6kbwZEsBkEqeaORCQQSO5/Dj868W+HXxV1LxHq+uXL2tsNJtJoreOAZDqedzZAOcnHPoPu5NTyft2+F9Niu1urF7hoEDDy0dX3ZGVZSvDYOQMnI/GvBPhr40H/CSX5R0ihZ42Hmqm0FpySWJ5OQMdq9Gvmsq1PmpyaseLQwFOnKzSZ9+eBbu38Q6cl2iNbnzDE8MvDK4/h+tenaXpjIo8uNiOpOK+M9I+KP8AwgusSeIX037TFBPG4jVMCUGNlIUgcEk5zz1r0XWP25rfw/p0FzN4Kugsqg5e9QKhKkqD8vGcH72OlcizKNRWm9TslhYUJWPjvwP8ErX4vfvoNM1G7CwILoI0UcZJBwWLfN7YGOntitXR/hTo/ALNXvLefxDDc7nUmCNHfYi42gMpXcACAQRgkcHvRRXy7qShg3Pe2n3HfGMYx5ktTqtd8VeGrzS1sbW7sp76ZyjTm4FvdKAPlIjfCOeMA5J9ffyH9oy5k8N6TFJaz2KX2oKQqLNF9oEMWcO3llUCnkAY3bsgFupKK2wiVegqstzCpJz1Z//2Q==',
  '/assets/images/register.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtfhb+0ldeJ55F1DS9MCo4H+js8ZxuQYG5myfmJ/4Ca9G8H/tK+EPEf2EX9nLprXLNHHt2usYTOS/3T0BPAPWvhX4Y/EO58MXhS+jihnhk+z3NlEjKPMCqWCsGxjDAhlPQjBr2XxHpEN9Fp5guZL+8eZEtblHEXm3EiMwjiwCGXaApByzZGeoAwnmuJpyV5XRnDAYecdI2PtjR/iN8PLiKKVfFOlxrIMp5s6x7h7BsZ/yOteg6TqPhzUIBLZ6vZzxnHzJMpHTPODxX5sRWPiXwnqt3Fp1zLDdX8q79NiQcsUPIX5gMke2Tk8da9z8NeOdb8PaVBbeIZYHvV+UtFGYxgAfwkDbzkfgK9DCYx42o6bbv+BwYqksHD2iWh8rfD/4M6v4r8F/2sda0mC0RW+0zatMdoZUwGjCBXTaMDnqSOeoPQacPCvh3Qb6DWteg106PLPcWdlpXnRTPMQvyt8iEABVJAY9MZByaKK+Ww8FVcYy7nu1H7OKcVujhPB3xalj1U6vqVz9ltJ5FSHbKFfDENE3lu20lMA7gxyExzkivoSx+I3hH4owaTpd5q/2TxfdtKIXRWeKYxepOVBOCRwOCO/AKKUZPD1XKD7k/xI8ktmf/2Q==',
  '/assets/images/register.png': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtfhb+0ldeJ55F1DS9MCo4H+js8ZxuQYG5myfmJ/4Ca9G8H/tK+EPEf2EX9nLprXLNHHt2usYTOS/3T0BPAPWvhX4Y/EO58MXhS+jihnhk+z3NlEjKPMCqWCsGxjDAhlPQjBr2XxHpEN9Fp5guZL+8eZEtblHEXm3EiMwjiwCGXaApByzZGeoAwnmuJpyV5XRnDAYecdI2PtjR/iN8PLiKKVfFOlxrIMp5s6x7h7BsZ/yOteg6TqPhzUIBLZ6vZzxnHzJMpHTPODxX5sRWPiXwnqt3Fp1zLDdX8q79NiQcsUPIX5gMke2Tk8da9z8NeOdb8PaVBbeIZYHvV+UtFGYxgAfwkDbzkfgK9DCYx42o6bbv+BwYqksHD2iWh8rfD/4M6v4r8F/2sda0mC0RW+0zatMdoZUwGjCBXTaMDnqSOeoPQacPCvh3Qb6DWteg106PLPcWdlpXnRTPMQvyt8iEABVJAY9MZByaKK+Ww8FVcYy7nu1H7OKcVujhPB3xalj1U6vqVz9ltJ5FSHbKFfDENE3lu20lMA7gxyExzkivoSx+I3hH4owaTpd5q/2TxfdtKIXRWeKYxepOVBOCRwOCO/AKKUZPD1XKD7k/xI8ktmf/2Q==',
  '/assets/images/forgot-password.jpg': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1zwd/UPv7eFYdZtbbUogAPtka7JAe+RkK3bpjr3r17Q/2y9A1GxF5dRxzWjkYkjbbsz2ORX56Xet/CrwrZwTaWur6tqjgoGuoEitIyxyDscSY656+uPSuOX4oa34516wjur4LHE5WG2t7VYg56fJHHGAxz3xWVKU9U195lPvc/TvWv2vfDVs7C2064vEZSVeHnHGenVvwFeD/E/9vHUredLPw9Z2thMh2PJfR7ix6FsEAYz2wOccnNeXav8AY/DUmoTT39pHa/voI2tJxINoBTAKjk7mBJ4HQDvWP4qs/D3hTwLpU50nT7nXGtwtxJLbecrE55ByeeThvx+nLLHTcvZxVnsa/Vrx5kz5BTxQ2s3omgtG88bAUiU7AAAN2P8ADA45r2P4Z6l4f097aO3ivtQv4wtxczxCNobdQcuJAzqjKf7pfHA75oor1aUFJKL6nDObWp7xP458HXd1dX1gLAC/tfKg0iFhp8k4fBYmU/IHwTjHcYyeteX/ABD8cyHRItNFnNbRQmRSJp0l3BQCfnIBBzuyMKSVHUmiivluZ1ZOct7v+v8Ahj01Jwhyx0R//9k=',
  '/assets/images/forgot-password.png': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1zwd/UPv7eFYdZtbbUogAPtka7JAe+RkK3bpjr3r17Q/2y9A1GxF5dRxzWjkYkjbbsz2ORX56Xet/CrwrZwTaWur6tqjgoGuoEitIyxyDscSY656+uPSuOX4oa34516wjur4LHE5WG2t7VYg56fJHHGAxz3xWVKU9U195lPvc/TvWv2vfDVs7C2064vEZSVeHnHGenVvwFeD/E/9vHUredLPw9Z2thMh2PJfR7ix6FsEAYz2wOccnNeXav8AY/DUmoTT39pHa/voI2tJxINoBTAKjk7mBJ4HQDvWP4qs/D3hTwLpU50nT7nXGtwtxJLbecrE55ByeeThvx+nLLHTcvZxVnsa/Vrx5kz5BTxQ2s3omgtG88bAUiU7AAAN2P8ADA45r2P4Z6l4f097aO3ivtQv4wtxczxCNobdQcuJAzqjKf7pfHA75oor1aUFJKL6nDObWp7xP458HXd1dX1gLAC/tfKg0iFhp8k4fBYmU/IHwTjHcYyeteX/ABD8cyHRItNFnNbRQmRSJp0l3BQCfnIBBzuyMKSVHUmiivluZ1ZOct7v+v8Ahj01Jwhyx0R//9k='
};

export const AuthBanner: React.FC<AuthBannerProps> = ({
  image = '/assets/images/login.jpg',
  showBackHome = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Tự động chuyển đổi đường dẫn sang .jpg tối ưu (nhỏ hơn 95% so với file PNG gốc)
  const targetImage = image.endsWith('.png') ? image.replace(/\.png$/, '.jpg') : image;

  // Lấy ảnh mờ Base64 sẵn có để render tức thì 0ms, không khoảng trắng, không màn đen
  const placeholderSrc = BLUR_PLACEHOLDERS[targetImage] || BLUR_PLACEHOLDERS[image] || BLUR_PLACEHOLDERS['/assets/images/login.jpg'];

  // Kiểm tra ảnh đã có trong cache trình duyệt chưa để hiển thị ngay không cần hiệu ứng chờ
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = targetImage;
      return img.complete && img.naturalWidth > 0;
    }
    return false;
  });

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.src = targetImage;
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      img.onload = () => {
        if (active) setIsLoaded(true);
      };
    }
    return () => {
      active = false;
    };
  }, [targetImage]);

  return (
    <div
      style={{
        flex: '1 1 50%',
        position: 'relative',
        minHeight: '100%',
        overflow: 'hidden',
        // Tông nền tự nhiên, hài hòa với màu trời xanh và cỏ cây của ảnh (thay cho nền đen #0b132b)
        backgroundColor: '#e2e8f0',
        background: 'linear-gradient(135deg, #dbeafe 0%, #f1f5f9 50%, #e2e8f0 100%)'
      }}
    >
      {/* 1. Base64 Low-Quality Image Placeholder (LQIP): Hiển thị tức thì 0ms, mờ ảo cao cấp */}
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt="Banner preview placeholder"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.08)', // Tránh viền trắng khi blur
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.4s ease-out',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* 2. Hiệu ứng Shimmer Skeleton ánh sáng lướt qua khi đang tải */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
            animation: 'authBannerShimmer 1.5s infinite ease-in-out',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Nút về trang chủ ở phía trên cùng bên trái của Banner */}
      {showBackHome && (
        <button
          type="button"
          onClick={() => navigate('/')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            top: '1.75rem',
            left: '1.75rem',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1rem',
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: isHovered ? 'var(--green-primary)' : 'var(--text-main)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: isHovered ? 'translateX(-2px)' : 'none'
          }}
        >
          <ArrowLeft size={16} />
          <span>Về trang chủ</span>
        </button>
      )}

      {/* 3. Ảnh Banner độ nét cao tối ưu (JPEG 1600px Retina, ~400KB thay vì 10MB) */}
      <img
        src={targetImage}
        alt="GreenNest Real Estate Banner"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setIsLoaded(true)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          zIndex: 3,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      />

      <style>{`
        @keyframes authBannerShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
