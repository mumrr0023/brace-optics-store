"use client";
import { motion, AnimatePresence } from "motion/react";
import { Camera, X, RotateCcw, Image, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { Product } from "../data/products";

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct: Product;
  allProducts: Product[];
}

export function VirtualTryOn({ isOpen, onClose, currentProduct, allProducts }: VirtualTryOnProps) {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(currentProduct);
  const [showFrameSelector, setShowFrameSelector] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleEnableCamera = () => {
    setCameraEnabled(true);
  };

  const handleTakePhoto = () => {
    setPhotoTaken(true);
  };

  const handleRetake = () => {
    setPhotoTaken(false);
  };

  const handleSave = () => {
    alert("Photo saved successfully!");
    onClose();
  };

  const changeFrame = (direction: "prev" | "next") => {
    const currentIndex = allProducts.findIndex((p) => p.id === selectedFrame.id);
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allProducts.length - 1;
    } else {
      newIndex = currentIndex < allProducts.length - 1 ? currentIndex + 1 : 0;
    }
    setSelectedFrame(allProducts[newIndex]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#E74C3C]/90 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-6 border-b border-[#1D3557]/10">
              <div>
                <h2 className="text-2xl md:text-3xl tracking-tight uppercase">Virtual Try-On</h2>
                <p className="text-sm text-[#1D3557]/60 mt-1">Try glasses with AI technology</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#1D3557]/5 transition-colors rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Camera Preview */}
              <div className="relative aspect-[4/3] bg-[#E74C3C] rounded-lg overflow-hidden">
                {!cameraEnabled ? (
                  /* Camera Disabled State */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8">
                      <Camera className="w-20 h-20 mx-auto text-white/40" />
                      <div className="space-y-2">
                        <p className="text-white text-lg">Camera Access Required</p>
                        <p className="text-white/60 text-sm">
                          Enable your camera to try on glasses virtually
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Camera Enabled - Live Preview */
                  <>
                    {/* Simulated Camera Feed */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />

                    {/* Face Detection Guide */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-64 h-80 border-2 border-white/40 rounded-lg">
                        {/* Face Detection Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#E74C3C]" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#E74C3C]" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#E74C3C]" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#E74C3C]" />

                        {/* Center Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-white text-sm tracking-wider uppercase">
                            Align Your Face
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Glasses Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <img
                        src={selectedFrame.hoverImage}
                        alt="Glasses overlay"
                        className="w-48 h-auto opacity-70 mix-blend-screen"
                      />
                    </motion.div>

                    {/* Face Detection Status */}
                    <div className="absolute top-4 left-4 bg-[#E74C3C] text-white px-4 py-2 rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-sm tracking-wider uppercase">Face Detected</span>
                    </div>

                    {/* Current Frame Info */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded">
                      <p className="text-sm tracking-wider uppercase">{selectedFrame.name}</p>
                      <p className="text-xs text-[#1D3557]/60">${selectedFrame.price}</p>
                    </div>

                    {/* Photo Taken Overlay */}
                    {photoTaken && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-white"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              {!cameraEnabled ? (
                /* Enable Camera Button */
                <button
                  onClick={handleEnableCamera}
                  className="w-full bg-[#E74C3C] text-white py-4 hover:bg-[#C0392B] transition-colors flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  <span className="tracking-wider uppercase text-sm">Enable Camera</span>
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Frame Selector */}
                  <div className="flex items-center justify-between gap-4 bg-[#E3F2FD] p-4">
                    <button
                      onClick={() => changeFrame("prev")}
                      className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[#E74C3C] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex-1 text-center">
                      <p className="text-sm tracking-wider uppercase mb-1">Current Frame</p>
                      <p className="tracking-wider uppercase">{selectedFrame.name}</p>
                    </div>

                    <button
                      onClick={() => changeFrame("next")}
                      className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[#E74C3C] hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {!photoTaken ? (
                      <>
                        <button
                          onClick={() => setShowFrameSelector(!showFrameSelector)}
                          className="flex flex-col items-center justify-center gap-2 bg-[#E3F2FD] hover:bg-[#E74C3C] hover:text-white transition-colors py-4"
                        >
                          <Image className="w-6 h-6" />
                          <span className="text-xs tracking-wider uppercase">Change Frame</span>
                        </button>

                        <button
                          onClick={handleRetake}
                          className="flex flex-col items-center justify-center gap-2 bg-[#E3F2FD] hover:bg-[#E74C3C] hover:text-white transition-colors py-4"
                        >
                          <RotateCcw className="w-6 h-6" />
                          <span className="text-xs tracking-wider uppercase">Reset</span>
                        </button>

                        <button
                          onClick={handleTakePhoto}
                          className="col-span-2 bg-[#E74C3C] text-white hover:bg-[#C0392B] transition-colors py-4 flex items-center justify-center gap-2"
                        >
                          <Camera className="w-6 h-6" />
                          <span className="text-sm tracking-wider uppercase">Take Photo</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleRetake}
                          className="col-span-2 border-2 border-[#1D3557] text-[#1D3557] hover:bg-[#E74C3C] hover:text-white transition-colors py-4 flex items-center justify-center gap-2"
                        >
                          <RotateCcw className="w-6 h-6" />
                          <span className="text-sm tracking-wider uppercase">Retake</span>
                        </button>

                        <button
                          onClick={handleSave}
                          className="col-span-2 bg-[#E74C3C] text-white hover:bg-[#E74C3C]/90 transition-colors py-4 flex items-center justify-center gap-2"
                        >
                          <Check className="w-6 h-6" />
                          <span className="text-sm tracking-wider uppercase">Save Photo</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Frame Grid Selector */}
                  {showFrameSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="grid grid-cols-4 md:grid-cols-6 gap-3 pt-4 border-t border-[#1D3557]/10"
                    >
                      {allProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedFrame(product);
                            setShowFrameSelector(false);
                          }}
                          className={`aspect-square bg-[#E3F2FD] overflow-hidden hover:ring-2 hover:ring-black transition-all ${
                            selectedFrame.id === product.id ? "ring-2 ring-[#E74C3C]" : ""
                          }`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Instructions */}
              <div className="bg-[#E3F2FD] p-6 space-y-3">
                <h3 className="tracking-wider uppercase text-sm">How It Works</h3>
                <ul className="space-y-2 text-sm text-[#1D3557]/70">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-[#E74C3C] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                      1
                    </span>
                    <span>Enable your camera and align your face within the frame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-[#E74C3C] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                      2
                    </span>
                    <span>Browse different frames using the arrows or frame selector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-[#E74C3C] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                      3
                    </span>
                    <span>Take a photo when you find the perfect pair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-[#E74C3C] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                      4
                    </span>
                    <span>Save and share your virtual try-on photos</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
