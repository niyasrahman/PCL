import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { dummy } from "../data";

function generatePointCloud(vertices, color) {
  var geometry = new THREE.Geometry();
  var colors = [];
  var k = 0;
  var stride = 4;
  for (var i = 0, l = vertices.length / 4; i < l; i++) {
    // creates new vector from a cluster and adds to geometry
    var v = new THREE.Vector3(
      vertices[stride * k + 1],
      vertices[stride * k + 2],
      vertices[stride * k]
    );

    // stores y coordinates into yCoords
    //window.LIDAR.yCoords.push(vertices[stride * k + 2]);

    // add vertex to geometry
    geometry.vertices.push(v);
    colors.push(color.clone());
    k++;
  }
  //geometry.colors = normalizeColors(vertices, color);
  geometry.colors = colors;
  geometry.computeBoundingBox();

  var material = new THREE.PointsMaterial({
    size: 1,
    sizeAttenuation: false,
    vertexColors: THREE.VertexColors
  });
  // creates pointcloud given vectors
  var pointcloud = new THREE.Points(geometry, material);

  return {
    geometry: geometry,
    material: material
  };
}

export const Particles = function({ pointCount }) {
  let data = dummy[0].id.split(",").map(x => parseFloat(x));
  let custom = generatePointCloud(data, new THREE.Color(0, 1, 0));
  useEffect(() => {
    console.log(custom.geometry);
  }, []);

  return (
    <mesh
      visible
      userData={{ test: "hello" }}
      position={new THREE.Vector3(1, 2, 3)}
      rotation={new THREE.Euler(0, 0, 0)}
      geometry={new THREE.SphereGeometry(1, 16, 16)}
      material={
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("hotpink"),
          transparent: true
        })
      }
    />
  );
};
